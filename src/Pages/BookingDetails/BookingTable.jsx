import React, { Fragment, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { RadioInput, DateInput } from "../../Components/FormComp";
import { instance } from "../../Components/Others/AxiosInstance";
import { useSelector } from "react-redux";
import { secretKey } from "../../Components/Others/ApiUrls";
const BookingTable = () => {
  const loginData = useSelector((state) => state.authData);
  const [rowData, setRowData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  // Column Definitions: Defines the columns to be displayed.
  const columnDefs = [
    { headerName: "Booking Id", field: "bookingId" },
    { headerName: "Portel User Name", field: "portel_userName" },

    { headerName: "Book Ref Number", field: "bookingRefNumber" },
    { headerName: "Attraction Name", field: "attractionName" },
    { headerName: "Pax Name", field: "paxName" },
    { headerName: "Contact Number", field: "contactNumber" },
    { headerName: "no.Adult", field: "no_Adult" },
    { headerName: "no.Child", field: "no_Child" },
    { headerName: "Adult Price", field: "AdultPrice" },
    { headerName: "Child Price", field: "ChildPrice" },
    { headerName: "Total", field: "Total" },
    { headerName: "Book Date", field: "bookingDate" },
    { headerName: "Travel Date", field: "bookTravellDate" },
    { headerName: "Invoice", field: "InvoiceNumber" },
    { headerName: "PaymentMode", field: "bookPaymentMode" },
    { headerName: "Pdf File Name", field: "pdfFileName" },

    {
      headerName: "Download",
      filter: false,
      field: "ticketNumber",
      cellRenderer: function (params) {
        return (
          <div>
            <button
              className="btn btn-primary rounded"
              onClick={() => actionButton(params)}
            >
              Download
            </button>
          </div>
        );
      },
    },
  ];
  const [formData, setFormData] = useState({
    bookingTravelDate: "",
    startDate: "",
    endDate: "",
  });
  const [filterType, setfilterType] = useState("1");
  const [getTicketsAlso, setgetTicketsAlso] = useState("true");

  const handleRadioChange = (e) => {
    setfilterType(e.target.value);
  };

  const handleRadioChangeWithTkt = (e) => {
    setgetTicketsAlso(e.target.value);
  };

  const handleDateChange = (date, id) => {
    let formetDate = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;

    setFormData((prevData) => ({
      ...prevData,
      [id]: formetDate,
    }));
  };

  const postToApi = async () => {
    setisLoading(true);
    const postObject = {
      startDate: formData.startDate,
      endDate: formData.endDate,
      agencyId: loginData?.data?.userId && loginData?.data?.userId,
      filterType: filterType,
      bookingTravelDate: formData.bookingTravelDate,
      getTicketsAlso: getTicketsAlso,
      secretKey: secretKey,
    };

    console.log(JSON.stringify(postObject, null, 2));
    try {
      setisLoading(false);
      const res = await instance.post("getSalesReportForB2b", postObject);
      console.log(res.data);
      setRecordForTable(res.data);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };

  const setRecordForTable = (record) => {
    const organizedData = record.map((item) => ({
      bookingId: item.bookingId,
      portel_userName: item.agencyName,

      bookingRefNumber: item.bookingRefNumber,
      attractionName: item.attractionName,
      paxName: item.paxName,
      contactNumber: item.contactNumber,
      no_Adult: item.nofAdult,
      no_Child: item.nofChild,
      AdultPrice: item.salesAmountAdult,
      ChildPrice: item.salesAmountChild,
      Total: item.bookTotal,
      bookingDate: new Date(item.bookingDate).toLocaleDateString(),
      bookTravellDate: new Date(item.bookingTravelDate).toLocaleDateString(),
      InvoiceNumber: item.invoiceNumber,
      bookPaymentMode: paymode(item.bookPaymentMode),
      pdfFileName: item.pdfFileName,
    }));
    console.log("organizedData", organizedData);
    setRowData(organizedData);
  };

  const paymode = (bookPaymentMode) => {
    if (bookPaymentMode == 1) {
      return "Online";
    } else {
      return "Credit";
    }
  };

  const actionButton = (params) => {
    // console.log(params);
    const fileURL =
      // "http://66.29.149.191:8080/filestorage/parmartour/images/" +
      " https://www.parmartours.com/filestorage/" + params.data.pdfFileName;
    const filename = "e-Ticket.pdf";
    download_file(fileURL, filename);
    //  alert(`${params.data.tourPackageId} `);
    //{`tour-pack-details/${alltour.attractionsId}`}"/attraction/attraction-creation"
  };

  /* Helper function */

  function download_file(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
      var save = document.createElement("a");
      save.href = fileURL;
      save.target = "_blank";
      var filename = fileURL.substring(fileURL.lastIndexOf("/") + 1);
      save.download = fileName || filename;
      if (
        navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
        navigator.userAgent.search("Chrome") < 0
      ) {
        document.location = save.href;
        // window event not working here
      } else {
        var evt = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: false,
        });
        save.dispatchEvent(evt);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
      }
    }

    // for IE < 11
    else if (!!window.ActiveXObject && document.execCommand) {
      var _window = window.open(fileURL, "_blank");
      _window.document.close();
      _window.document.execCommand("SaveAs", true, fileName || fileURL);
      _window.close();
    }
  }

  return (
    <Fragment>
      <div>
        <div className="py-2 text-black font-bold">Your Booking List</div>
        <div>Filter Type</div>
        <div className="flex gap-10">
          <div className="mt-4">
            <div>
              <RadioInput
                label="Filter By Booking date"
                value="1"
                name="filterType"
                onChange={handleRadioChange}
                checked={filterType === "1"}
              />
            </div>
            <div>
              <RadioInput
                label="Filter By Travel Date"
                value="2"
                name="filterType"
                onChange={handleRadioChange}
                checked={filterType === "2"}
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <RadioInput
                label="With Tickets"
                value="true"
                name="withTicket"
                onChange={handleRadioChangeWithTkt}
                checked={getTicketsAlso === "true"}
              />
            </div>
            <div>
              <RadioInput
                label="Without Tickets"
                value="false"
                name="withTicket"
                onChange={handleRadioChangeWithTkt}
                checked={getTicketsAlso === "false"}
              />
            </div>
          </div>
          <div>
            {filterType === "2" && (
              <div>
                <DateInput
                  label="Select Date"
                  selectedDate={formData.bookingTravelDate}
                  handleDateChange={(e) =>
                    handleDateChange(e, "bookingTravelDate")
                  }
                />
              </div>
            )}

            {filterType === "1" && (
              <div className="flex gap-10">
                <div>
                  <DateInput
                    label="Start Date"
                    selectedDate={formData.startDate}
                    handleDateChange={(e) => handleDateChange(e, "startDate")}
                  />
                </div>
                <div>
                  <DateInput
                    label="End Date"
                    selectedDate={formData.endDate}
                    handleDateChange={(e) => handleDateChange(e, "endDate")}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mt-[35px]">
            <button
              className="btn btn-primary rounded"
              onClick={() => postToApi()}
            >
              <div className="flex items-center gap-2">
                <div>Get Report</div>
                {isLoading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-white fill-[#ffc107]"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex"></div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>
    </Fragment>
  );
};

export default BookingTable;

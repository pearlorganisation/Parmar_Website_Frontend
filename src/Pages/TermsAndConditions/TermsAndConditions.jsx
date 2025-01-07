import React, { Fragment } from "react";

const TermsAndConditions = () => {
  const condents = [
    {
      title: "",
      sub: "Thank you for choosing our travel package(s). By booking a trip through our website, you´re deemed to have agreed to its terms of use. Please read the following terms and procedures in order to make sure that you´ve clearly understood the conditions of your preferred trip. All of the below mentioned terms and conditions are applicable for bookings made through our websites such as:",
    },
    {
      title: "PRICING",
      sub: "Our policy assures you of an economic pricing, along with the convenience of making reservation online . Unless otherwise mentioned, prices quoted on our website are charged on per person basis, and do not include tips given to tour guides or drivers, passport / visa fee, travel insurance, drinks or food, accommodation, room services, and laundry. The published rates may change without prior notice, particularly in case of any unforeseen circumstance, such as increase in airline tickets, hotel rates, or transport expenses.",
    },
    {
      title: "METHODS OF PAYMENT",
      sub: "We accept almost all major credit cards, such as Visa, MasterCard, American Express, Discover, and Diners . Full payment must be done by credit card, and guests are entailed to provide their credit card number to complete the transaction. This, in turn, will be showed as a charge on your statement. ",
    },
    {
      title: "CONFIRMATION OF PAYMENT",
      sub: "Once the payment is done, our travel consultants will send you a confirmation slip by e-mail . Its print can be produced as an evidence of payment to the service provider to redeem your tour package. But make sure that you´ve provided correct information pertaining to your travel requirements at the time of booking.",
    },
    {
      title: "ITINERARY AMENDMENTS",
      sub: "Routings and services covered in your package are subject to change based on local / weather conditions, airway schedules and such other several aspects. Should this transpire, we can provide suitable options of similar value, however depending on its availability. At most, we announce changes in itinerary, if any, before departure. Please note that GWT Tours & Travels reserves complete right to implement minor amendments in itinerary at any time without reimbursement. Further, no reimbursement can be done in the event of vis major, such as flood and earthquake.",
    },
    {
      title: "HOTEL ACCOMMODATION & CHECK-IN – CHECK-OUT POLICY",
      sub: "If we are not able to trace for you an accommodation in your preferred hotel, all efforts will be undertaken to provide you with a suitable alternative of similar budget and standard. Speaking of check-in / check-out policy, it largely depends on the hotel that you´ve chosen. GWT Tours & Travels cannot be held responsible for any early or late check-in and check-out requests which are not adhered by the hotel due to their busy schedule.",
    },
    {
      title: "TRAVEL INSURANCE",
      sub: "Travelpack360 Tours & Travels shall not be responsible for any kind of damages as an outcome of accident, illness, injury, or loss",
    },
    {
      title: "TRAVEL DOCUMENTS",
      sub: "It is the responsibility of every guest to ensure that he or she carries documents relevant for a particular tour, including passport or a valid ID card. This is especially important for guests coming from a different country. No refund can be done in the event of loss or lack of these relevant documents. Similarly, passengers – irrespective of their nationality – are advised to check with their respective country´s consulate here to gain information on entry requisites, before they plan to visit here. Equally vital is to inquire with your consulate regarding the current visa and health requirements, as they are subject to change without prior notice.",
    },
    {
      title: "WEBSITE USAGE RESTRICTIONS",
      sub: "All content in this website, including logo, images, information on tour package, pricing details, and other relevant details, are proprietary to GWT Tours and Travels. Accordingly, as a condition of this website´s usage, you agree not to exploit this website or its content for any non-personal, commercial, or illegitimate purposes.",
    },
    {
      title: "GOVERNING LAW AND JURISDICTION",
      sub: "Inclusion is mandatory and should have any one of the below mentioned points. “Any purchase, dispute or claim arising out of or in connection with this website shall be governed and construed in accordance with the laws of UAE”.",
    },
  ];
  return (
    <Fragment>
      <div className="container mx-auto">
        <div className="p-5 text-center md:px-20 lg:px-20">
          <div>
            <div className="text-gray-600">
              {" "}
              Protecting your personal information
            </div>
            <div className="text-2xl font-Kanit800">TERMS AND CONDITIONS</div>
          </div>
        </div>
        <div className="p-5 md:px-20 lg:px-20">
          {condents.map((item, index) => (
            <div key={index} className="mt-5 lg:mt-10 md:mt-10">
              {" "}
              <div className="text-xl font-Kanit800">
                {item.title && <div>{item.title}</div>}
              </div>
              <div className="text-gray-700">
                {item.sub && <div>{item.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default TermsAndConditions;

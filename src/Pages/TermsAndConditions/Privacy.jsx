import React, { Fragment } from "react";
import Banner from "../../Components/Common/Banner";

const Privacy = () => {
  const condents = [
    {
      title: "",
      sub: "At Travelpack360 tours & Travels, we respect our valued customer's privacy and ensure not to collect any information other than the information relevant to make booking with us. As such, we strive to take care of our customer’s right to privacy in connection with their interaction with this website. Our scope of commitment as part of the use of your information is outlined herein.",
    },
    {
      title: "COLLECTION OF PERSONAL INFORMATION",
      sub: "We collect your information mainly when you contact us to inquire us about our products and services or make a booking with us. This usually includes your name , contact details,email id,physical address,credit card or payment details,travel requisites and referral source. Upon the submission of information, you give consent to GWT Tours to use your information to process orders in an accurate and prompt manner.",
    },
    {
      title: "USE OF INFORMATION",
      sub: "Any personal information of a client obtained through this website will be utilized by GWT Tours to process his or her booking, verify credit card details, and provide relevant information associated with client’s travel or any other subsidiary services he or she would like to avail of. This information will also be used for auditing, research and activities focused to improve the performance of our website.",
    },
    {
      title: "PRIVACY OF YOUR INFORMATION",
      sub: "All information provided by our customers during online booking, such as their name,address,email id and credit card details is considered private, and will not be disclosed or sold to anyone except for certain suppliers or third parties whose involvement in the loop is fundamental for the successful processing of your order. But before disclosing your information, we make sure that these third parties abide by our privacy policy and adhere to strict safety measures.",
    },
    {
      title: "LEGAL DISCLOSURE OF INFORMATION",
      sub: "We may disclose your information, if we feel that such disclosure is pertinent to protect our company’s rights and / or abide by a court order or a legal proceeding. ",
    },
    {
      title: "CONTESTS AND SURVEYS",
      sub: "Travelpack360 tours & Travels conducts contests, drawings and surveys every now and then. Some contents are organized in collaboration with a third party sponsor, and visitors to our websites will be informed at the time of the contest regarding the involvement of a particular third party and their extent of using your personal information. Since participating in these contests is voluntary, it’s solely at your discretion whether or not to partake in them and reveal your personal information.",
    },
    {
      title: "SECURED TRANSACTION",
      sub: "In order to maintain accuracy of data and avoid unauthorized access of our client’s personal information, we make sure that all transactions are carried out through our secured server. Moreover, we utilize technical safeguard system such as encryption, socket layers, and firewalls to secure your sensitive information like credit card details.",
    },
  ];
  return (
    <Fragment>
      <Banner backgroundImage="../img/car-4.png" />
      <div className="container py-5">
        <div className="p-5 text-center">
          <div>
            <div className="text-gray-600">
              {" "}
              Protecting your personal information
            </div>
            <div className="text-2xl font-Kanit800">PRIVACY POLICY</div>
          </div>
        </div>
        <div className="p-5 ">
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

export default Privacy;

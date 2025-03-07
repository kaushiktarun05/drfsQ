import React from "react";
import CardHeader from "./CardHeader";
import StatusBadge from "./StatusBadge";

function CompanyRow({
  id,
  company,
  companyLogo,
  status,
  type,
  sku,
  contact,
  contactAvatar,
  price,
}) {
  return (
    <tr>
      <td className="p-2.5 text-sm">{id}</td>
      <td className="p-2.5 text-sm flex items-center gap-2.5">
        <img src={companyLogo} alt={company} />
        <span>{company}</span>
      </td>
      <td className="p-2.5 text-sm">
        <StatusBadge status={status} />
      </td>
      <td className="p-2.5 text-sm">{type}</td>
      <td className="p-2.5 text-sm">{sku}</td>
      <td className="p-2.5 text-sm flex items-center gap-2.5">
        <img src={contactAvatar} alt={contact} />
        <span>{contact}</span>
      </td>
      <td className="p-2.5 text-sm">{price}</td>
      <td className="p-2.5 text-sm">
        <i className="ti ti-dots"></i>
      </td>
    </tr>
  );
}

function CompanyTable() {
  const companies = [
    {
      id: "4168",
      company: "Louis Vuitton",
      companyLogo: "https://placehold.co/24x24/9c27b0/9c27b0",
      status: "Active",
      type: "Bravo",
      sku: "9177",
      contact: "Evan Flores",
      contactAvatar: "https://placehold.co/24x24/666666/666666",
      price: "$452.85",
    },
    {
      id: "63583",
      company: "Johnson & Johnson",
      companyLogo: "https://placehold.co/24x24/2196f3/2196f3",
      status: "Danger",
      type: "Alfa",
      sku: "3064",
      contact: "Arlene Wilson",
      contactAvatar: "https://placehold.co/24x24/666666/666666",
      price: "$901.31",
    },
    {
      id: "83055",
      company: "Starbucks",
      companyLogo: "https://placehold.co/24x24/ff5722/ff5722",
      status: "Pending",
      type: "Bravo",
      sku: "9195",
      contact: "Jennie Cooper",
      contactAvatar: "https://placehold.co/24x24/666666/666666",
      price: "$541.20",
    },
    {
      id: "81633",
      company: "The Walt Disney",
      companyLogo: "https://placehold.co/24x24/e91e63/e91e63",
      status: "Danger",
      type: "Alfa",
      sku: "3128",
      contact: "Philip Steward",
      contactAvatar: "https://placehold.co/24x24/666666/666666",
      price: "$510.30",
    },
    {
      id: "66282",
      company: "Mitsubishi",
      companyLogo: "https://placehold.co/24x24/4caf50/4caf50",
      status: "Pending",
      type: "Bravo",
      sku: "9892",
      contact: "Jorge Black",
      contactAvatar: "https://placehold.co/24x24/666666/666666",
      price: "$828.90",
    },
    {
      id: "55619",
      company: "IBM",
      companyLogo: "https://placehold.co/24x24/2196f3/2196f3",
      status: "Danger",
      type: "Gold",
      sku: "9011",
      contact: "Gladys Jones",
      contactAvatar: "https://placehold.co/24x24/666666/666666",
      price: "$545.59",
    },
  ];

  return (
    <section className="col-span-2">
      <CardHeader
        title="Table"
        subtitle="May to June 2021"
        showActions={true}
      />

      <div className="p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                ID
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                Company
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                Status
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                Type
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                SKU
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                Contact
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                Price USD
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <CompanyRow key={company.id} {...company} />
            ))}
          </tbody>
        </table>
      </div>

      <footer className="flex justify-between items-center p-5 border-t border-white border-opacity-10">
        <div className="flex items-center gap-2.5">
          <i className="ti ti-chevron-left"></i>
          <span>1 / 16</span>
          <i className="ti ti-chevron-right"></i>
        </div>
        <div className="flex items-center gap-2.5">
          <span>Rows per page: 6</span>
          <i className="ti ti-chevron-down"></i>
        </div>
      </footer>
    </section>
  );
}

export default CompanyTable;

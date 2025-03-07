"use client";
import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import CardHeader from "./CardHeader";

function OptionsTable() {
  const [activeYear, setActiveYear] = useState("2021");
  const years = ["2021", "2020", "2019", "2018"];

  const tableData = [
    {
      id: "123",
      country: "Spain",
      status: "Active",
      percentage: "17%",
      quantity: "245",
      tag: "SE454547",
    },
    {
      id: "456",
      country: "EEUU",
      status: "Pending",
      percentage: "5%",
      quantity: "255",
      tag: "RE452347",
    },
    {
      id: "789",
      country: "France",
      status: "Danger",
      percentage: "-18%",
      quantity: "356",
      tag: "2XA4353",
    },
  ];

  return (
    <section>
      <CardHeader
        title="List of options"
        subtitle="May to June 2021"
        showActions={true}
      />

      <div className="flex gap-6 p-5 border-b border-white border-opacity-10">
        {years.map((year) => (
          <button
            key={year}
            className={`cursor-pointer pb-1.5 ${
              activeYear === year ? "font-semibold" : ""
            }`}
            onClick={() => setActiveYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      <div className="p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                <span>ID</span>
                <i className="ti ti-arrows-vertical"></i>
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                <span>Country</span>
                <i className="ti ti-arrows-vertical"></i>
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                <span>Status</span>
                <i className="ti ti-arrows-vertical"></i>
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                <span>%</span>
                <i className="ti ti-arrows-vertical"></i>
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                <span>Quantity</span>
                <i className="ti ti-arrows-vertical"></i>
              </th>
              <th className="text-left p-2.5 font-normal text-[#B1C7DF] text-sm">
                <span>Tags</span>
                <i className="ti ti-arrows-vertical"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id}>
                <td className="p-2.5 text-sm">{row.id}</td>
                <td className="p-2.5 text-sm">{row.country}</td>
                <td className="p-2.5 text-sm">
                  <StatusBadge status={row.status} />
                </td>
                <td
                  className={`p-2.5 text-sm ${
                    row.percentage.includes("-") ? "text-[#FF7E78]" : ""
                  }`}
                >
                  {row.percentage}
                </td>
                <td className="p-2.5 text-sm">{row.quantity}</td>
                <td className="p-2.5 text-sm">
                  <span className="px-3 py-0.5 rounded-lg border border-[#C8D6EB] text-[#C8D6EB]">
                    {row.tag}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OptionsTable;

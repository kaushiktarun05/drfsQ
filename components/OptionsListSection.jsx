"use client";
import React, { useState } from "react";
import SectionHeader from "./SectionHeader";

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-900 text-green-400";
      case "pending":
        return "bg-yellow-900 text-yellow-400";
      case "danger":
        return "bg-red-900 text-red-400";
      default:
        return "";
    }
  };

  return (
    <td
      className={`p-3.5 text-sm text-left rounded border-b border-solid border-b-zinc-700 ${getStatusStyles()}`}
    >
      {status}
    </td>
  );
}

function OptionsListSection() {
  const [activeYear, setActiveYear] = useState("2021");
  const years = ["2021", "2020", "2019", "2018"];

  const tableData = [
    { id: "123", country: "Spain", status: "Active", percentage: "17%" },
    { id: "456", country: "EEUU", status: "Pending", percentage: "5%" },
    { id: "789", country: "France", status: "Danger", percentage: "-18%" },
  ];

  return (
    <section className="p-5 rounded-2xl shadow-sm bg-zinc-900">
      <SectionHeader
        title="List of options"
        subtitle="May to June 2021"
        showActions={true}
      />

      <div>
        <div className="flex gap-6 mx-0 my-5 text-white max-sm:overflow-x-auto max-sm:pb-2.5">
          {years.map((year) => (
            <button
              key={year}
              className={`${activeYear === year ? "font-semibold" : ""}`}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <div className="max-sm:overflow-x-auto">
          <table className="w-full text-white border-collapse">
            <thead>
              <tr>
                <th className="p-3.5 text-left border-b border-solid border-b-zinc-700">
                  ID
                </th>
                <th className="p-3.5 text-left border-b border-solid border-b-zinc-700">
                  Country
                </th>
                <th className="p-3.5 text-left border-b border-solid border-b-zinc-700">
                  Status
                </th>
                <th className="p-3.5 text-left border-b border-solid border-b-zinc-700">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td className="p-3.5 text-left border-b border-solid border-b-zinc-700">
                    {row.id}
                  </td>
                  <td className="p-3.5 text-left border-b border-solid border-b-zinc-700">
                    {row.country}
                  </td>
                  <StatusBadge status={row.status} />
                  <td
                    className={`p-3.5 text-left border-b border-solid border-b-zinc-700 ${
                      row.percentage.includes("-") ? "text-red-400" : ""
                    }`}
                  >
                    {row.percentage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default OptionsListSection;

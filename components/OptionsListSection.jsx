"use client";
import React, { useState } from "react";
import SectionHeader from "./SectionHeader";

function TableRow({ id, country, status, percentage, isNegative }) {
  const getStatusClass = () => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "Danger":
        return "bg-red-500/20 text-red-400";
      default:
        return "";
    }
  };

  return (
    <tr>
      <td className="p-3.5 text-left border-b border-solid border-b-zinc-700">
        {id}
      </td>
      <td className="p-3.5 text-left border-b border-solid border-b-zinc-700">
        {country}
      </td>
      <td
        className={`p-3.5 text-sm text-left rounded border-b border-solid border-b-zinc-700 ${getStatusClass()}`}
      >
        {status}
      </td>
      <td
        className={`p-3.5 text-left border-b border-solid border-b-zinc-700 ${
          isNegative ? "text-red-400" : ""
        }`}
      >
        {percentage}
      </td>
    </tr>
  );
}

function OptionsListSection() {
  const [activeYear, setActiveYear] = useState("2021");
  const years = ["2021", "2020", "2019", "2018"];

  const tableData = [
    { id: "123", country: "Spain", status: "Active", percentage: "17%" },
    { id: "456", country: "EEUU", status: "Pending", percentage: "5%" },
    {
      id: "789",
      country: "France",
      status: "Danger",
      percentage: "-18%",
      isNegative: true,
    },
  ];

  return (
    <section className="p-5 rounded-2xl shadow-sm">
      <SectionHeader title="List of options" />

      <div>
        <div className="flex gap-6 mx-0 my-5 text-white max-sm:overflow-x-auto max-sm:pb-2.5">
          {years.map((year) => (
            <button
              key={year}
              className={`${activeYear === year ? "font-medium" : ""}`}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <table className="w-full text-white border-collapse max-sm:block max-sm:overflow-x-auto">
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
              <TableRow key={row.id} {...row} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OptionsListSection;

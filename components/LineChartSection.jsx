import React from "react";
import SectionHeader from "./SectionHeader";

function LineChartSection() {
  const chartValues = ["$31,350.00", "$16,280.00", "$15,070.00"];

  return (
    <section className="p-5 rounded-2xl shadow-sm bg-zinc-900">
      <SectionHeader
        title="Lines chart"
        subtitle="May to June 2021"
        showActions={false}
      />

      <div>
        <div className="flex justify-between mb-5 text-white">
          {chartValues.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </div>
        <div className="rounded-lg bg-zinc-800 h-[200px]" />
      </div>
    </section>
  );
}

export default LineChartSection;

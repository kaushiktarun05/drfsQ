import React from "react";

function MetricCard({ value, label }) {
  return (
    <article className="p-5 rounded-2xl shadow-sm max-md:flex-[1_1_calc(50%_-_20px)] max-sm:flex-[1_1_100%]">
      <h2 className="mb-2 text-2xl font-semibold text-white">{value}</h2>
      <p className="text-sm text-zinc-300">{label}</p>
    </article>
  );
}

function MetricsSection() {
  const metrics = [
    { value: "$10,243.00", label: "Total Revenue" },
    { value: "$1,444.00", label: "Total Profit" },
    { value: "5,692.00", label: "Total Loss" },
    { value: "15,271.00", label: "Total Cost" },
  ];

  return (
    <section className="flex gap-5 mb-5 max-md:flex-wrap">
      {metrics.map((metric, index) => (
        <MetricCard key={index} value={metric.value} label={metric.label} />
      ))}
    </section>
  );
}

export default MetricsSection;

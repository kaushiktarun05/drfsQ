import React from "react";
import SectionHeader from "./SectionHeader";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function LegendItem({ color, country, customers }) {
  return (
    <div className="flex gap-2 items-center">
      <span
        className="rounded-full h-[18px] w-[18px]"
        style={{ backgroundColor: color }}
      />
      <div className="text-white">
        <div>{country}</div>
        <div className="text-xs text-zinc-300">{customers}</div>
      </div>
    </div>
  );
}

function PieChartSection() {
  const data = [
    { name: "Spain", value: 200, color: "#FFB572" },
    { name: "EEUU", value: 122, color: "#6BE2BE" },
    { name: "China", value: 264, color: "#F4DB57" },
  ];

  const legendItems = [
    { color: "#FFB572", country: "Spain", customers: "200 customers" },
    { color: "#6BE2BE", country: "EEUU", customers: "122 customers" },
    { color: "#F4DB57", country: "China", customers: "264 customers" },
  ];

  return (
    <section className="p-5 rounded-2xl shadow-sm">
      <SectionHeader title="Line Pie Chart" />

      <div>
        <div className="flex gap-10 mt-5">
          <div style={{ width: 156, height: 164 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  startAngle={0}
                  endAngle={360}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-4">
            {legendItems.map((item, index) => (
              <LegendItem
                key={index}
                color={item.color}
                country={item.country}
                customers={item.customers}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PieChartSection;

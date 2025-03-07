import React from "react";
import SectionHeader from "./SectionHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function LinesChartSection() {
  const chartValues = ["$31,350.00", "$16,280.00", "$15,070.00"];

  // Sample data for the line chart
  const data = [
    { name: "Jan", revenue: 15000, profit: 8000, loss: 2000 },
    { name: "Feb", revenue: 18000, profit: 9500, loss: 2200 },
    { name: "Mar", revenue: 22000, profit: 11000, loss: 3000 },
    { name: "Apr", revenue: 25000, profit: 12500, loss: 3500 },
    { name: "May", revenue: 28000, profit: 14000, loss: 4000 },
    { name: "Jun", revenue: 31350, profit: 16280, loss: 5070 },
  ];

  return (
    <section className="p-5 rounded-2xl shadow-sm">
      <SectionHeader title="Lines chart" />

      <div>
        <div className="flex justify-between mb-5 text-white">
          {chartValues.map((value, index) => (
            <span key={index}>{value}</span>
          ))}
        </div>
        <div className="rounded-lg bg-zinc-800 h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="name"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#374151",
                  borderColor: "#4B5563",
                  color: "#F9FAFB",
                }}
                labelStyle={{ color: "#F9FAFB" }}
                formatter={(value) => [`$${value}`, ""]}
              />
              <Legend
                wrapperStyle={{ color: "#F9FAFB" }}
                formatter={(value) => (
                  <span style={{ color: "#F9FAFB" }}>{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#FFB572"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#6BE2BE"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="loss"
                stroke="#F4DB57"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default LinesChartSection;

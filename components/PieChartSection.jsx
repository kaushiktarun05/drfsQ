import React from "react";
import SectionHeader from "./SectionHeader";

function LegendItem({ color, country, customers }) {
  return (
    <div className="flex gap-2 items-center">
      <span
        className="rounded-full h-[18px] w-[18px]"
        style={{ backgroundColor: color }}
      />
      <div className="text-white">
        <div>{country}</div>
        <div className="text-xs text-zinc-300">{customers} customers</div>
      </div>
    </div>
  );
}

function PieChartSection() {
  const legendItems = [
    { color: "#FFB572", country: "Spain", customers: "200" },
    { color: "#6BE2BE", country: "EEUU", customers: "122" },
    { color: "#F4DB57", country: "China", customers: "264" },
  ];

  return (
    <section className="p-5 rounded-2xl shadow-sm bg-zinc-900">
      <SectionHeader
        title="Line Pie Chart"
        subtitle="May to June 2021"
        showActions={true}
      />

      <div>
        <div className="flex gap-10 mt-5">
          <div>
            <svg
              width="156"
              height="164"
              viewBox="0 0 156 164"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="pie-chart-svg"
            >
              <path
                d="M72.9797 19.4441C84.1103 19.4441 95.0474 22.2967 104.706 27.7187C114.364 33.1408 122.408 40.9439 128.038 50.3536C133.669 59.7633 136.691 70.4526 136.805 81.3606C136.919 92.2686 134.12 103.016 128.687 112.537C123.254 122.057 115.374 130.02 105.831 135.634C96.2881 141.249 85.4128 144.32 74.2845 144.543C63.1563 144.766 52.162 142.133 42.3927 136.906C32.6233 131.678 24.4186 124.038 18.5927 114.743"
                stroke="#6BE2BE"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M74.2731 36.5791C82.3548 36.5791 90.296 38.6503 97.3087 42.5872C104.321 46.5241 110.162 52.1897 114.25 59.022C118.339 65.8542 120.533 73.6155 120.616 81.5356C120.698 89.4558 118.666 97.2594 114.721 104.172C110.776 111.085 105.055 116.866 98.126 120.943C91.1969 125.019 83.3005 127.249 75.2205 127.411C67.1405 127.573 59.1577 125.661 52.0644 121.866C44.971 118.07 39.0137 112.523 34.7836 105.774"
                stroke="#F4DB57"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <path
                d="M71.8144 4C85.6929 4 99.3302 7.55683 111.373 14.3175C123.416 21.0782 133.445 30.8077 140.466 42.5406C147.487 54.2734 151.256 67.6017 151.397 81.2027C151.539 94.8037 148.05 108.205 141.275 120.076C134.5 131.947 124.676 141.875 112.776 148.876C100.877 155.876 87.317 159.706 73.4414 159.984C59.5657 160.262 45.8571 156.979 33.6759 150.461C21.4947 143.943 11.2643 134.416 4.00005 122.827"
                stroke="#FFB572"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
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

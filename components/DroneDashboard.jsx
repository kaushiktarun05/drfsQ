"use client";
import React from "react";
import Header from "./Header";
import DateSelector from "./DateSelector";
import DroneGrid from "./DroneGrid";
import OptionsTable from "./OptionsTable";
import NewsSection from "./NewsSection";
import CompanyTable from "./CompanyTable";

function DroneDashboard() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <main
        className="min-h-screen font-['Inter',sans-serif] text-white"
        style={{
          background:
            "linear-gradient(134deg,#4E4E4E -16.04%,#333 9.33%,#1A1A1A 32.02%,#1A1A1A 62.06%,#262626 87.42%,#4E4E4E 112.12%)",
        }}
      >
        <div className="p-5">
          <Header />

          <DateSelector />

          <section className="mb-10">
            <h1 className="text-[34px] font-semibold flex items-center gap-2.5 mb-5">
              Drone flights
              <i className="ti ti-chevron-down"></i>
            </h1>

            <DroneGrid />
          </section>

          <section className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
            <OptionsTable />
            <NewsSection />
            <CompanyTable />
          </section>
        </div>
      </main>
    </>
  );
}

export default DroneDashboard;

"use client";
import React, { useState } from "react";
import SectionHeader from "./SectionHeader";

function WorldMapSection() {
  const [activeTab, setActiveTab] = useState("World");
  const tabs = ["World", "America", "Europe", "Asia", "Africa", "Oceania"];

  return (
    <section className="p-5 rounded-2xl shadow-sm bg-zinc-900">
      <SectionHeader
        title="World map"
        subtitle="May to June 2021"
        showActions={true}
      />

      <nav className="flex gap-6 mx-0 my-5 text-white max-sm:overflow-x-auto max-sm:pb-2.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              activeTab === tab ? "font-semibold" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div>
        <div className="w-full rounded-lg bg-zinc-800 h-[300px]" />
      </div>
    </section>
  );
}

export default WorldMapSection;

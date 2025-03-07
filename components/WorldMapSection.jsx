"use client";
import React, { useState } from "react";
import SectionHeader from "./SectionHeader";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// World map GeoJSON
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function WorldMapSection() {
  const [activeTab, setActiveTab] = useState("World");
  const tabs = ["World", "America", "Europe", "Asia", "Africa", "Oceania"];

  return (
    <section className="p-5 rounded-2xl shadow-sm">
      <SectionHeader title="World map" />

      <nav className="flex gap-6 mx-0 my-5 text-white max-sm:overflow-x-auto max-sm:pb-2.5">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`cursor-pointer ${
              activeTab === tab ? "font-medium" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div>
        <div className="w-full rounded-lg bg-zinc-800 h-[300px] overflow-hidden">
          <ComposableMap
            projectionConfig={{
              scale: 147,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#4B5563"
                    stroke="#374151"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#6BE2BE", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </section>
  );
}

export default WorldMapSection;

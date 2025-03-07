"use client";
import React from "react";
import MetricsSection from "./MetricsSection";
import DroneInfoSection from "./DroneInfoSection";
import WorldMapSection from "./WorldMapSection";
import OptionsListSection from "./OptionsListSection";
import PieChartSection from "./PieChartSection";
import LinesChartSection from "./LinesChartSection";

function Dashboard() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <main className="p-5 min-h-screen bg-zinc-900">
        <header className="mb-5">
          <MetricsSection />
          <DroneInfoSection />
        </header>
        <section className="grid gap-5 grid-cols-[2fr_1fr] max-md:grid-cols-[1fr]">
          <WorldMapSection />
          <OptionsListSection />
          <PieChartSection />
          <LinesChartSection />
        </section>
      </main>
    </>
  );
}

export default Dashboard;

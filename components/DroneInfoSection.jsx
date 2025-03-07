import React from "react";

function Stat({ label, value }) {
  return (
    <div className="flex justify-between mb-2">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function SpecList({ specs }) {
  return (
    <div className="flex flex-col gap-2">
      {specs.map((spec, index) => (
        <div key={index}>{spec}</div>
      ))}
    </div>
  );
}

function DroneInfoSection() {
  return (
    <section className="flex gap-10 p-5 rounded-2xl shadow-sm max-md:flex-wrap">
      <h2 className="mb-4 text-lg text-white">Model XYZ 345</h2>

      <div className="text-sm text-zinc-300">
        <Stat label="Speed" value="45 km/h" />
        <Stat label="Height" value="1.50 km" />
      </div>

      <div className="p-2.5 text-2xl text-white rounded-full border-2 border-white border-solid">
        360°
      </div>

      <div className="text-zinc-300">
        <h3 className="mb-2.5 text-white">Camera type</h3>
        <SpecList specs={["4K", "1920x1050", "50mm", "Premium"]} />
      </div>

      <div className="text-zinc-300">
        <h3 className="mb-2.5 text-white">Flight time</h3>
        <div className="flex flex-col gap-2">
          <Stat label="Time" value="54 min" />
          <Stat label="Simulation" value="1.20 min" />
          <Stat label="TMP" value="23° C" />
        </div>
      </div>
    </section>
  );
}

export default DroneInfoSection;

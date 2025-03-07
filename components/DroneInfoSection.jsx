import React from "react";

function StatItem({ label, value }) {
  return (
    <div className="flex justify-between mb-2">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function CameraSpecs() {
  const specs = ["4K", "1920x1050", "50mm", "Premium"];

  return (
    <div className="text-zinc-300">
      <h3 className="mb-2.5 text-white">Camera type</h3>
      <div className="flex flex-col gap-2">
        {specs.map((spec, index) => (
          <div key={index}>{spec}</div>
        ))}
      </div>
    </div>
  );
}

function FlightInfo() {
  const stats = [
    { label: "Time", value: "54 min" },
    { label: "Simulation", value: "1.20 min" },
    { label: "TMP", value: "23° C" },
  ];

  return (
    <div className="text-zinc-300">
      <h3 className="mb-2.5 text-white">Flight time</h3>
      <div className="flex flex-col gap-2">
        {stats.map((stat, index) => (
          <StatItem key={index} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  );
}

function DroneInfoSection() {
  return (
    <section className="flex gap-10 p-5 rounded-2xl shadow-sm bg-zinc-900 max-md:flex-wrap">
      <h2 className="mb-4 text-lg text-white">Model XYZ 345</h2>

      <div className="text-sm text-zinc-300">
        <StatItem label="Speed" value="45 km/h" />
        <StatItem label="Height" value="1.50 km" />
      </div>

      <div className="p-2.5 text-2xl text-white rounded-full border-2 border-white border-solid">
        360°
      </div>

      <CameraSpecs />
      <FlightInfo />
    </section>
  );
}

export default DroneInfoSection;

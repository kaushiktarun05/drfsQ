import React from "react";
import StatusBadge from "./StatusBadge";

function DroneCard({ image, name, stats, status }) {
  return (
    <article className="bg-white bg-opacity-5 rounded-xl p-[15px] flex flex-col gap-2.5">
      <img src={image} alt={name} />

      <div className="mt-2.5">
        <h3 className="font-medium mb-1.5">{name}</h3>
        <p className="text-sm text-gray-400">{stats}</p>
      </div>

      <StatusBadge status={status} />
    </article>
  );
}

function DroneGrid() {
  const drones = [
    {
      image: "https://placehold.co/120x120/e0e0e0/e0e0e0",
      name: "Model XS Pro",
      stats: "45 km/h • 1.45 km",
      status: "Connected",
    },
    {
      image: "https://placehold.co/120x120/2a6f2a/2a6f2a",
      name: "ME",
      stats: "0 km/h • 0 km",
      status: "Offline",
    },
    {
      image: "https://placehold.co/120x120/444444/444444",
      name: "Vortais",
      stats: "0 km/h • 0 km",
      status: "Offline",
    },
    {
      image: "https://placehold.co/120x120/ffffff/ffffff",
      name: "Engage",
      stats: "60 km/h • 1.12 km",
      status: "Connected",
    },
    {
      image: "https://placehold.co/120x120/000000/000000",
      name: "eXpedite",
      stats: "0 km/h • 0 km",
      status: "Review",
    },
    {
      image: "https://placehold.co/120x120/d3d3d3/d3d3d3",
      name: "Envisioneer",
      stats: "56 km/h • 0.45 km",
      status: "Connected",
    },
  ];

  return (
    <div className="grid grid-cols-6 gap-5 max-md:grid-cols-3 max-sm:grid-cols-1">
      {drones.map((drone, index) => (
        <DroneCard
          key={index}
          image={drone.image}
          name={drone.name}
          stats={drone.stats}
          status={drone.status}
        />
      ))}
    </div>
  );
}

export default DroneGrid;

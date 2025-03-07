import React from "react";

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case "connected":
        return "bg-green-900 text-green-400";
      case "offline":
        return "bg-gray-900 text-gray-400";
      case "review":
        return "bg-yellow-900 text-yellow-400";
      case "active":
        return "bg-green-900 text-green-400";
      case "pending":
        return "bg-yellow-900 text-yellow-400";
      case "danger":
        return "bg-red-900 text-red-400";
      default:
        return "bg-gray-900 text-gray-400";
    }
  };

  return (
    <span
      className={`px-2.5 py-1.5 rounded text-xs w-fit ${getStatusStyles()}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;

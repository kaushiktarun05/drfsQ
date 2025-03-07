import React from "react";

function CardHeader({ title, subtitle, showActions = false }) {
  return (
    <header className="p-5 border-b border-white border-opacity-10 flex justify-between items-start">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-400">{subtitle}</p>
      {showActions && (
        <div className="flex gap-2.5">
          <i className="ti ti-share"></i>
          <i className="ti ti-download"></i>
          <i className="ti ti-settings"></i>
        </div>
      )}
    </header>
  );
}

export default CardHeader;

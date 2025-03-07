import React from "react";

function SectionHeader({
  title,
  subtitle = "May to June 2021",
  showActions = true,
}) {
  return (
    <header className="flex justify-between items-center pb-5 border-b border-solid border-b-white">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="text-sm text-zinc-300">{subtitle}</p>
      {showActions && (
        <div className="flex gap-2 text-white">
          <i className="ti ti-share" />
          <i className="ti ti-download" />
          <i className="ti ti-settings" />
        </div>
      )}
    </header>
  );
}

export default SectionHeader;

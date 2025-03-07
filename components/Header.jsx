import React from "react";

function Header() {
  return (
    <header className="flex items-center justify-between p-[10px_20px] mb-5">
      <div className="flex items-center gap-2.5 text-xl font-semibold">
        <img
          src="https://placehold.co/40x40/333333/333333"
          alt="Data Crush Logo"
        />
        <span>Data Crush</span>
      </div>

      <nav className="flex gap-5 max-sm:hidden">
        <button className="cursor-pointer p-[5px_10px]">Dashboard</button>
        <button className="cursor-pointer p-[5px_10px]">Tables</button>
        <button className="cursor-pointer p-[5px_10px]">Alerts</button>
        <button className="cursor-pointer p-[5px_10px]">News</button>
        <button className="cursor-pointer p-[5px_10px]">Add view</button>
      </nav>

      <div className="flex items-center gap-5 max-sm:gap-2.5">
        <button className="cursor-pointer">
          <i className="ti ti-search"></i>
        </button>
        <button className="cursor-pointer">
          <i className="ti ti-bell"></i>
        </button>
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col items-end max-sm:hidden">
            <span>Armand</span>
            <span className="text-xs text-gray-400">Premium</span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://placehold.co/32x32/666666/666666"
              alt="User avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

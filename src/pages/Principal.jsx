import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PiHouseBold, PiUserFill } from "react-icons/pi";
import { MdSettings, MdMenu, MdClose, MdTheaters, MdThermostat, MdThermostatAuto, MdOutlineThermostat } from "react-icons/md";
import { BiSolidBookBookmark } from "react-icons/bi";
import { GiLightBulb, GiBuoy, GiGroundSprout } from "react-icons/gi";

import TelaLed from "./TelaLed";
import BoiaStatus from "./BoiaStatus";
import TempUmidStatus from "./TempUmidStatus";
import SensorSolo from "./SensorDht";
import SensorIrrigacao from "./IrrigacaoAutomatica";
import monitorChuva from "./monitorChuva";

export default function Principal() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar responsivo */}
      <section
        className={`fixed z-30 inset-y-0 transform w-64 bg-gray-900 text-white p-4 
            transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
              menuAberto ? "translate-x-0" : "-translate-x-full"
            }`}
      >
        {" "}
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold">Menu</span>
          <button className="md:hidden" onClick={() => setMenuAberto(false)}>
            {" "}
            <MdClose className="w-5 h-5 cursor-pointer" />{" "}
          </button>
        </div>

        <nav className="space-y-4">
            <Link
              to="/telaled"
              onClick={() => setMenuAberto(false)}
              className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 "
            >
              <GiLightBulb className="w-5 h-5" />
              <span className="font-semibold">Tela Led</span>
            </Link>
            <Link
              to="/telaBoia"
              onClick={() => setMenuAberto(false)}
              className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 "
            >
              <GiBuoy className="w-5 h-5" />
              <span className="font-semibold">Tela Boia</span>
            </Link>
            <Link
              to="/telaTempUmid"
              onClick={() => setMenuAberto(false)}
              className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 "
            >
              <MdOutlineThermostat className="w-5 h-5" />
              <span className="font-semibold">Tela Temp e Umid</span>
            </Link>
            <Link
              to="/telaSensorSolo"
              onClick={() => setMenuAberto(false)}
              className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 "
            >
              <GiGroundSprout className="w-5 h-5" />
              <span className="font-semibold">Sensor Solo</span>
            </Link>
            <Link
              to="/telaIrrigacao"
              onClick={() => setMenuAberto(false)}
              className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 "
            >
              <GiGroundSprout className="w-5 h-5" />
              <span className="font-semibold">Irrigação Automatica</span>
            </Link>
            <Link
              to="/monitorChuva"
              onClick={() => setMenuAberto(false)}
              className="flex items-center gap-4 p-2 rounded hover:bg-gray-700 "
            >
              <GiGroundSprout className="w-5 h-5" />
              <span className="font-semibold">Monitor Chuva</span>
            </Link>
          </nav>
      </section>

      {/* Conteúdo principal */}
      <section className="flex-1 p-8 min-h-screen bg-indigo-200 text-black w-full overflow-auto">
        <header>
            <button className="md:hidden text-slate-800" onClick={() => setMenuAberto(true)}><MdMenu className="w-6 h-6 cursor-pointer"/></button>
        </header>
        <main>
            <Routes>
                <Route path="/" element={<TelaLed />} />
                <Route path="/telaled" element={<TelaLed />} />
                <Route path="/telaBoia" element={<BoiaStatus />} />
                <Route path="/telaTempUmid" element={<TempUmidStatus />} />
                <Route path="/telaSensorSolo" element={<SensorSolo />} />
                <Route path="/telaIrrigacao" element={< SensorIrrigacao/>} />
                <Route path="/monitorChuva" element={< monitorChuva/>} />
            </Routes>
        </main>
      </section>
    </div>
  );
}
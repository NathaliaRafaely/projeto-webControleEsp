import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

function getStatusTemp(temp) {
  if (temp === "--" || isNaN(Number(temp))) return { texto: "Sem dados", cor: "bg-gray-300 text-gray-700" };
  const valor = Number(temp);
  if (valor > 35) return { texto: "Muito Alta", cor: "bg-red-500 text-white animate-pulse" };
  if (valor < 0) return { texto: "Muito Baixa", cor: "bg-blue-500 text-white animate-pulse" };
  return { texto: "Controlada", cor: "bg-green-500 text-white" };
}

function getStatusUmid(umid) {
  if (umid === "--" || isNaN(Number(umid))) return { texto: "Sem dados", cor: "bg-gray-300 text-gray-700" };
  const valor = Number(umid);
  if (valor < 30) return { texto: "Muito Baixa", cor: "bg-red-500 text-white animate-pulse" };
  if (valor > 80) return { texto: "Muito Alta", cor: "bg-blue-500 text-white animate-pulse" };
  return { texto: "Controlada", cor: "bg-green-500 text-white" };
}

export default function TempUmidStatus() {
  const [statusTemp, setStatusTemp] = useState("--");
  const [statusUmid, setStatusUmid] = useState("--");

  const buscarStatus = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/api/statusTempUmid`);
      const dados = await resposta.json();
      setStatusTemp(dados.statusTemp || "--");
      setStatusUmid(dados.statusUmid || "--");
    } catch (error) {
      setStatusTemp("--");
      setStatusUmid("--");
      console.log("Erro ao buscar dados", error);
    }
  };

  useEffect(() => {
    buscarStatus();
    const intervalo = setInterval(buscarStatus, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const statusTempObj = getStatusTemp(statusTemp);
  const statusUmidObj = getStatusUmid(statusUmid);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-extrabold mb-8 tracking-wide text-[#8470FF] drop-shadow-lg">
        Temperatura & Umidade
      </h1>
      <div className="flex gap-8">
        {/* Cartão Temperatura */}
        <div className="bg-gradient-to-br from-orange-100 to-orange-300 rounded-2xl shadow-xl p-8 flex flex-col items-center w-64">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <path d="M12 2a2 2 0 0 1 2 2v8.28a4 4 0 1 1-4 0V4a2 2 0 0 1 2-2z" stroke="#fb923c" strokeWidth="2" />
            <circle cx="12" cy="18" r="2" fill="#fb923c" />
          </svg>
          <span className="text-5xl font-bold text-orange-500 mt-4 mb-2 drop-shadow">{statusTemp}<span className="text-2xl align-super">°C</span></span>
          <span className="text-lg text-orange-700 font-semibold">Temperatura</span>
          <div className={`mt-4 px-4 py-2 rounded-full font-bold text-center text-sm shadow ${statusTempObj.cor}`}>
            Status: {statusTempObj.texto}
          </div>
        </div>
        {/* Cartão Umidade */}
        <div className="bg-gradient-to-br from-sky-100 to-sky-300 rounded-2xl shadow-xl p-8 flex flex-col items-center w-64">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" stroke="#0ea5e9" strokeWidth="2" />
            <ellipse cx="12" cy="17" rx="4" ry="3" fill="#0ea5e9" opacity="0.3" />
          </svg>
          <span className="text-5xl font-bold text-sky-500 mt-4 mb-2 drop-shadow">{statusUmid}<span className="text-2xl align-super">%</span></span>
          <span className="text-lg text-sky-700 font-semibold">Umidade</span>
          <div className={`mt-4 px-4 py-2 rounded-full font-bold text-center text-sm shadow ${statusUmidObj.cor}`}>
            Status: {statusUmidObj.texto}
          </div>
        </div>
      </div>
    </div>
  );
}
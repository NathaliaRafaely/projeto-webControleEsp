import { useState, useEffect } from "react";
import { enderecoServidor } from "../../utils";

export default function BoiaStatus(){
    const [statusBoia, setStatusBoia] = useState('');

    const buscarStatus = async() =>{
        try{
            const resposta = await fetch(`${enderecoServidor}/api/statusBoia`);
            const dados = await resposta.json();
            setStatusBoia(dados.statusBoia);
        }catch(error){
            console.log('Erro ao buscar dados', error);
        }
    }
        useEffect(() =>{
            buscarStatus();
            const intervalo = setInterval(buscarStatus, 5000);
            return () => clearInterval(intervalo);
        })
    
        return(
            <div className="max-w-xs mx-auto p-4">
                <h1 className="text-xl font-bold text-center mb-4">Nível de água</h1>
                <div className="relative h-48 w-32 mx-auto 
                border-2 border-gray-400 rounded bg-gray-100">
                    <div className={`absolute bottom-0 w-full ${
                        statusBoia === "ALTO" ? 'h-full bg-blue-500' //cheio
                        : 'h-1/2 bg-blue-400' //metade
                        }`}>
                    </div>
                </div>
                <p className="text-center mt-4 font-medium">
                    Status: {statusBoia === 'ALTO' ? (
                        <span className="text-red-600">ALTO</span>
                    ) : (<span className="text-blue-600">BAIXO</span>) 
                    }
                </p>

                <div className="flex-column p-1 mt-4">
                <p className="text-center">Acesse o link do projeto do Wokwi</p>
                <div className="flex justify-center">
                    <a className="text-center text-3x1 font-bold text-white bg-blue-400 rounded p-3" href="https://wokwi.com/projects/439347432074740737" target="_blank">Controle Boia</a>
                </div>
            </div>
            </div>
        )
}
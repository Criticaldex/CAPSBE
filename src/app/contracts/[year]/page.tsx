'use client'

import React from "react";
import { getMongoData, getCentros } from "../../services/contracts";
import ContractsChart from "./chart";


interface IndicatorContract {
    Indicador: string
    Resultat: Array<[string]>
    Centre: string
    Any: string
}


async function getCleanCenters() {
    const centro = await getCentros({});
    return centro[0].Centros
}

export default async function loadContracts({ params }: any) {
    
    const [infoChart, setInfoChart] = React.useState<any>([{name: 'uno', data: [12,34,453]}])
    
    const { year } = params;
    const centros = await getCleanCenters();
    const indicadoresContrato: Array<IndicatorContract[]> = await Promise.all(centros.map((centro: string, i: number) => {
        return getMongoData({ "Any": year, "Centre": i.toString() })
    }))


    const handleChangeCenterData = (numCenter: number) => {
        const datos = indicadoresContrato[numCenter].map((indicadorContrato: any) => {
            return {
                name: indicadorContrato.Indicador,
                data: indicadorContrato.Resultat.map((res: string) => parseFloat(res.replaceAll(',', '.')))
            }
        })
        const chartInfo = {
            tituloGrafica: centros[numCenter],
            chartData: datos
        }
        setInfoChart(chartInfo)
    } 

    return (
        <section className="min-h-screen pt-24">
            <div className="w-7/12 table-auto text-center m-auto border rounded-lg overflow-hidden">
                <table className="table-auto text-left m-auto min-w-full divide-x divide-gray-200">
                    <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-300 dark:bg-neutral-800">
                        <tr className="text-xl">
                            <th className="px-3 py-3">Indicadores</th>
                            {centros.map((nameCenter: string, indice: number) => (
                                <th className="px-3 py-3 text-center" key={indice}>{nameCenter}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {indicadoresContrato[0].map((dato: IndicatorContract, index: number) => (
                            <tr id={index.toString()} key={index} className="even:bg-gray-100 hover:bg-gray-200 p-96">
                                <td className="px-2 py-2">{dato.Indicador}</td>
                                {indicadoresContrato.map((contractCentro: IndicatorContract[], indice: number) => (
                                    <td className="px-2 py-2 text-center" key={index + indice}>{contractCentro[index].Resultat[contractCentro[index].Resultat.length - 1]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {<div className="text-center pt-10 w-2/3 m-auto">
                {centros.map((nameCenter: string, indice: number) => (
                    <button onClick={() => handleChangeCenterData(indice)} className="w-1/3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" key={indice}>{nameCenter}</button>
                ))}
            </div>}
            <ContractsChart infoChart={infoChart} />
        </section>
    );
}

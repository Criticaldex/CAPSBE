'use client'

import React, { useEffect, useState } from "react";
import { getContracts, getCentros } from "../services/contracts";


interface IndicatorContract {
    Indicador: string
    Resultat: Array<[string]>
    Centre: string
    Any: string
}

const ContractTable: React.FC = () => {
    const [contractCenters, setContractCenters] = useState<Array<IndicatorContract[]>>([]);
    const [selectedYear, setSelectedYear] = useState<string>("2023");
    const [loading, setLoading] = useState<boolean>(true)
    const [nameCenters, setNameCenters] = useState<string[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const centros = await getCentros({});
                
                const promises = centros[0].Centros.map((async (centro: string, indice: number) => {
                    return getContracts({ "Any": selectedYear, "Centre": indice.toString() })
                }))
                
                const responseCentros: Array<IndicatorContract[]> = await Promise.all(promises);
                
                setContractCenters(responseCentros);
                setNameCenters(centros[0].Centros)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching contracts:', error);
            }
        };

        fetchData();
    }, [selectedYear]);

    return (
        <section className="min-h-screen pt-24">
            <div className="w-full text-right">
                <select name="any" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-1/12 p-2.5 mr-10'>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
            </div>
            <div className="w-7/12 table-auto text-center m-auto">
                {!loading ? (
                    <table className="table-auto text-left m-auto">
                        <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                            <tr className="text-xl">
                                <th className="px-3 py-3">Indicadores</th>
                                {nameCenters.map((nameCenter: string, indice: number) => (
                                    <th className="px-3 py-3 text-center" key={indice}>{nameCenter}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {contractCenters[0].map((dato: IndicatorContract, index: number) => (
                                <tr id={index.toString()} key={index} className="even:bg-red-100 p-96">
                                    <td className="px-2 py-2">{dato.Indicador}</td>
                                    {contractCenters.map((contractCentro: IndicatorContract[], indice: number) => (
                                        <td className="px-2 py-2 text-center" key={index+indice}>{contractCentro[index].Resultat[contractCentro[index].Resultat.length - 1]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </section>
    );
};

export default ContractTable;

import { getMongoData, getCentros } from "../../services/contracts";
import ContractsChart from "./chart";


interface IndicatorContract {
  Indicador: string
  Resultat: Array<[string]>
  Centre: string
  Any: string
}


async function getCleanCenters(){
  const centro = await getCentros({});
  return centro[0].Centros
}

export default async function loadContracts({ params }:any) {
  const { year } = params;
  const centros = await getCleanCenters();
  const indicadoresContrato: Array<IndicatorContract[]> = await Promise.all(centros.map((centro: string, i: number) => {
    return getMongoData({ "Any": year, "Centre": i.toString() })
  }))

  const infoChart = {
    centros: centros,
    indicadoresContrato: indicadoresContrato
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
      <ContractsChart infoChart={infoChart} />
    </section>
  );
}

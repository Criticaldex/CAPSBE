import Image from 'next/image'
import { useState, useEffect } from 'react';

const getContracts = (filter: any) => {
  return fetch('http://localhost:3000/api/contracts',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(
        {
          model: 'contract',
          fields: [
            "Indicador",
            "Resultat",
            "Any",
            "Centre",
            "-_id"
          ],
          filter: filter
        }
      ),
    }).then(res => res.json());
}

interface indicatorContract {
  Indicador: string
  Resultat: Array<[string]>
  Centre: string
  Any: string
}

export default async function Home() {

  const contracteCentroSarria = await getContracts({"Any": "2023", "Centre": "0"});
  const contracteCentroVallplasa = await getContracts({"Any": "2023", "Centre": "1"});
  // console.log('DATA: ', data);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <select name="any" className=''>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
      </select>
      <table>
        <tbody>
          {contracteCentroSarria.data.map((dato: indicatorContract, index: number) => (
            <tr id={index.toString()} key={index}>
                <td>{dato.Indicador}</td>
                <td>{dato.Resultat.at(-1)}</td>
                <td>{contracteCentroVallplasa.data[index].Resultat.at(-1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

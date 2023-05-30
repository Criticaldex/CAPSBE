'use client'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const options = {
    chart: { type: 'spline'},
    title: {
        text: 'My chart'
    },
    series: [{
        name: 'Indicador 1',
        data: [1, 2, 3, 2 ,1 ,3, 1, 3 ,2 ,3, 1, 1]
    },
    {
        name: 'Indicador 2',
        data: [3, 2, 1,2 ,3 ,3 ,1 ,1 ,2 ,2 ,2 ,3]
    },
    {
        name: 'Indicador 3',
        data: [3, 2, 1,2 ,3 ,3 ,1 ,1 ,2 ,2 ,2 ,3]
    },
    {
        name: 'Indicador 4',
        data: [1, 1, 2, 3, 2 ,1 ,3, 1, 3 ,2 ,3, 1]
    }],
    xAxis: {
        categories: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre']
    }
}

interface IndicatorContract {
    Indicador: string
    Resultat: Array<[string]>
    Centre: string
    Any: string
}

export default function ContractsChart({infoChart}: any) {
    

    return (
        <aside>
            {<div className="text-center pt-10 w-2/3 m-auto">
                {infoChart.centros.map((nameCenter: string, indice: number) => (
                    <button className="w-1/3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" key={indice}>{nameCenter}</button>
                ))}
            </div>}
            <div className='w-9/12 m-auto mt-20'>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>

        </aside>
    )
}
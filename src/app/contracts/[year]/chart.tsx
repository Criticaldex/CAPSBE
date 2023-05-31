'use client'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface IndicatorContract {
    Indicador: string
    Resultat: Array<[string]>
    Centre: string
    Any: string
}

export default function ContractsChart({infoChart}: any) {
    
    const options = {
        chart: { type: 'spline'},
        lang: {
            noData: "No hi han dades disponibles"
        },
        noData: {
            style: {
                fontSize: '26px',
                fontWeight: 'bold',
                color: '#666666'
            },
        },
        title: {
            text: infoChart.tituloGrafica
        },
        series: infoChart.chartData,
        xAxis: {
            categories: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre'],
            startOnTick: true
        },
        credits: {
            text: ""
        },
        legend:{ 
            enabled: true,
            align: 'right',
            verticalAlign: 'middle',
            width: 150
        },
        tooltip: {
            shared: false
        }
    }

    return (
        <aside>
            <div className="w-9/12 m-auto mt-20">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </div>
        </aside>
    )
}
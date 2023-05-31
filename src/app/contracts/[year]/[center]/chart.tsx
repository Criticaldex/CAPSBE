'use client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export function Chart({params}: any) {
   const { options } = params;

   return (
       <aside>
           <div className="w-9/12 m-auto mt-20">
               <HighchartsReact
                   highcharts={Highcharts}
                   options={params}
               />
           </div>
       </aside>
   )
}
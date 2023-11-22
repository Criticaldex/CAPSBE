import _ from "lodash"

const getIntervals = async (filter: any) => {

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/call_intervals`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: 'Capsbe',
               fields: [
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

export const getIntervalsToday = async () => {
   const pad = '00';
   // const date = (pad + (new Date().getDate() - 1)).slice(-pad.length);
   const date = '18'
   const month = (pad + (new Date().getMonth() + 1)).slice(-pad.length);
   const year = new Date().getFullYear().toString();

   const filter = {
      "any": year, "mes": month, "dia": date
   };
   const data = await getIntervals(filter);
   return data
}

export const getTotalToday = async () => {
   const pad = '00';
   const date = (pad + (new Date().getDate() - 1)).slice(-pad.length);
   // const date = '18'
   const month = (pad + (new Date().getMonth() + 1)).slice(-pad.length);
   const year = new Date().getFullYear().toString();

   const filter = {
      "any": year, "mes": month, "dia": date, "interval": "Total"
   };
   const data = await getIntervals(filter);
   return data
}

export const getCallsCenterMonth = async (year: string, month: string, center: string) => {
   const filter = { "any": year, "mes": month, "centro": center, "interval": "Total" };
   return _.orderBy(await getIntervals(filter), 'dia', 'asc');
}

export const getDashboardChart = async (year: string, month: string, center: string) => {
   const data: any = await getCallsCenterMonth(year, month, center);
   let chartData: any = [{
      type: 'column',
      name: 'Contestades',
      data: [],
   }, {
      type: 'column',
      name: 'Abandonades',
      data: [],
   }];

   data.forEach((ele: any) => {
      let ans: number = 0;
      let aba: number = 0;
      ele.titulos.forEach((e: any, i: number) => {
         ans += ele.answered[i];
         aba -= ele.abandoned[i];
      });
      chartData[0].data.push({
         name: ele.dia,
         y: ans,
         drilldown: ele.dia
      });
      chartData[1].data.push({
         name: ele.dia,
         y: aba,
         drilldown: ele.dia
      });
   });
   return chartData;
}

export const getDashboardChart2 = async (year: string, month: string, center: string) => {
   // const data: any = await getCallsCenterMonth(year, month, center);
   let chartData: any = [];

   // data[0].titulos.forEach((element: any) => {
   chartData.push(
      {
         series: [
            {
               name: '20',
               id: '20',
               data: [
                  [
                     'v58.0',
                     1.02
                  ],
                  [
                     'v57.0',
                     7.36
                  ],
                  [
                     'v56.0',
                     0.35
                  ],
                  [
                     'v55.0',
                     0.11
                  ],
                  [
                     'v54.0',
                     0.1
                  ],
                  [
                     'v52.0',
                     0.95
                  ],
                  [
                     'v51.0',
                     0.15
                  ],
                  [
                     'v50.0',
                     0.1
                  ],
                  [
                     'v48.0',
                     0.31
                  ],
                  [
                     'v47.0',
                     0.12
                  ]
               ]
            }
         ]
      });
   // });

   // data.forEach((ele: any) => {
   //    let index: number = 0;
   //    ele.titulos.forEach((e: any, i: number) => {
   //       chartData[index].data.push(ele.answered[i]);
   //       index++;
   //       chartData[index].data.push(0 - ele.abandoned[i]);
   //       index++;
   //    });
   // });
   return chartData;
}

export const getDashboardChartDays = async (year: string, month: string, center: string) => {
   const data: any = await getCallsCenterMonth(year, month, center);
   const days: any = [];
   data.forEach((ele: any) => {
      days.push(ele.dia);
   });
   return days;
}

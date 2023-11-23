import _ from "lodash"

const getIntervals = async (filter: any, sort?: any) => {

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
               sort: sort
            }
         ),
      }).then(res => res.json());
}

export const getIntervalsDay = async (date: string, month: string, year: string, center: string) => {
   // const pad = '00';
   // const date = (pad + (new Date().getDate() - 1)).slice(-pad.length);
   // // const date = '18'
   // const month = (pad + (new Date().getMonth() + 1)).slice(-pad.length);
   // const year = new Date().getFullYear().toString();

   const filter = {
      "any": year, "mes": month, "dia": date, "centro": center, "interval": "Total"
   };
   const data = await getIntervals(filter);
   return data
}

export const getHoursChart = async (year: string, month: string, day: string, center: string) => {
   const filter = { "any": year, "mes": month, "dia": day, "centro": center, order: { "$lt": 25 } };
   const sort = "dia";
   const data: any = await getIntervals(filter, sort);
   let chartData: any = [{
      type: 'column',
      name: 'Contestades',
      color: "var(--green)",
      data: [],
   }, {
      type: 'column',
      name: 'Abandonades',
      color: "var(--red)",
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
         name: ele.interval.split(' ')[0],
         y: ans,
      });
      chartData[1].data.push({
         name: ele.interval.split(' ')[0],
         y: aba,
      });
   });
   return chartData;
}

export const getIntervalsChart = async (year: string, month: string, day: string, center: string) => {
   const filter = { "any": year, "mes": month, "dia": day, "centro": center, order: { "$lt": 25 } };
   const sort = "dia";
   const data: any = await getIntervals(filter, sort);
   let chartData: any = [{
      type: 'column',
      name: 'Contestades',
      color: "var(--green)",
      data: [],
   }, {
      type: 'column',
      name: 'Abandonades',
      color: "var(--red)",
      data: [],
   }];

   if (data[0]) {
      data[0].titulos.forEach((e: any, i: number) => {
         let ans: number = 0;
         let aba: number = 0;
         data.forEach((ele: any) => {
            ans += ele.answered[i];
            aba -= ele.abandoned[i];
         });
         chartData[0].data.push({
            name: e,
            y: ans,
         });
         chartData[1].data.push({
            name: e,
            y: aba,
         });
      });
   }
   return chartData;
}

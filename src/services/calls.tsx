import _ from "lodash"

const getCalls = async (filter: any) => {
   // const session = await getSession();

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/calls`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: 'Capsbe',
               fields: [
                  "any",
                  "mes",
                  "dia",
                  "centro",
                  "abandoned",
                  "offered",
                  "answered",
                  "overflowed",
                  "answered_time",
                  "abandoned_time",
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

export const getCallsToday = async () => {
   const pad = '00';
   const date = (pad + (new Date().getDate() - 1)).slice(-pad.length);
   const month = (pad + (new Date().getMonth() + 1)).slice(-pad.length);
   const year = new Date().getFullYear().toString();

   const filter = {
      centro: {
         $nin: [
            "GS-PEDIATRIA",
            "Average",
            "Total",
         ]
      },
      "any": year, "mes": month, "dia": date
   };
   const data = await getCalls(filter);
   if (!data[0]) {
      return [{
         "abandoned": 0,
         "offered": 0,
         "answered": 0,
         "overflowed": 0,
         "answered_time": "00:00:00",
         "abandoned_time": "00:00:00",
         "centro": "0"
      },
      {
         "abandoned": 0,
         "offered": 0,
         "answered": 0,
         "overflowed": 0,
         "answered_time": "00:00:00",
         "abandoned_time": "00:00:00",
         "centro": "1"
      },
      {
         "abandoned": 0,
         "offered": 0,
         "answered": 0,
         "overflowed": 0,
         "answered_time": "00:00:00",
         "abandoned_time": "00:00:00",
         "centro": "2"
      }]
   }
   return data
}

export const getCallsCenterMonth = async (year: string, month: string, center: string) => {
   const filter = { "any": year, "mes": month, "centro": center };
   return _.orderBy(await getCalls(filter), 'dia', 'asc');
}

export const getDashboardChart = async (year: string, month: string, center: string) => {
   const data: any = await getCallsCenterMonth(year, month, center);
   let chartData: any = [{
      type: 'spline',
      name: 'Abandonades',
      data: []
   }, {
      type: 'spline',
      name: 'Contestades',
      data: []
   }, {
      type: 'spline',
      name: 'Totals',
      data: []
   }, {
      type: 'spline',
      name: 'Desviades',
      data: []
   }, {
      type: 'column',
      name: 'Temps Resposta',
      data: [],
      yAxis: 1
   }, {
      type: 'column',
      name: 'Temps Abandó',
      data: [],
      yAxis: 1
   },];
   data.forEach((ele: any) => {
      const ansArray = ele.answered_time.split(":");
      const abaArray = ele.abandoned_time.split(":");
      const ansTime = ((Number(ansArray[0]) * 60 * 60) + (Number(ansArray[1]) * 60) + Number(ansArray[2]))
      const abaTime = ((Number(abaArray[0]) * 60 * 60) + (Number(abaArray[1]) * 60) + Number(abaArray[2]))

      chartData[0].data.push(ele.abandoned);
      chartData[1].data.push(ele.answered);
      chartData[2].data.push(ele.offered);
      chartData[3].data.push(ele.overflowed);
      chartData[4].data.push(ansTime);
      chartData[5].data.push(abaTime);
   });
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

export const getTableIndicatorsNoCpr = async (year: string) => {
   const filter: any = {
      identificador: {
         $nin: [
            "GESTINF05",
            "PLA006",
            "POBATINF01",
            "CRONICITAT_RES",
            "GC0005",
            "NUT01",
            "FIS01",
            "BEN01",
            "BENRES01",
            "EQA0208"
         ]
      },
      any: year
   };
   const data = await getCalls(filter);
   return _.groupBy(data, 'identificador');
}

import { GaugeChart } from "./gaugeChart";
import { GetLinkCenter } from "./routing";

export function CardsAccessibilitat({ accessibilitats, centro }: any) {
   let color;
   let colorBG;

   if (accessibilitats.ACC5DF_EAP_AC < 50) {
      color = `var(--red)`;
      colorBG = `var(--redBG)`;
   } else if (accessibilitats.ACC5DF_EAP_AC < 75) {
      color = `var(--orange)`;
      colorBG = `var(--orangeBG)`;
   } else {
      color = `var(--green)`;
      colorBG = `var(--greenBG)`;
   }

   return (
      <section className="flex justify-around bg-bgLight rounded-md p-2">
         <div className={`text-center flex-col`}>
            <div className="text-2xl font-bold">
               {accessibilitats.name}
            </div>
            <div className="text-center grow m-2">
               <GaugeChart
                  nom={'nom'}
                  data={accessibilitats.ACC5DF_EAP_AC}
                  numColor={color}
                  numColorBg={colorBG}
               />
            </div>
            <table className="table mx-10 p-4">
               <tr className="text-right">
                  <th className="pr-4">DEM_SET:</th>
                  <td>{accessibilitats.demoraSetmanal}</td>
               </tr>
               <tr className="text-right">
                  <th className="pr-4">INF:</th>
                  <td>{accessibilitats.ACC5DF_INF}</td>
               </tr>
               <tr className="text-right">
                  <th className="pr-4">MF:</th>
                  <td>{accessibilitats.ACC5DF_MF}</td>
               </tr>
               <tr className="text-right">
                  <th className="pr-4">PED:</th>
                  <td>{accessibilitats.ACC5DF_PED}</td>
               </tr>
            </table>
            <div className="m-4">
               <GetLinkCenter
                  center={centro}
               />
            </div>
         </div >
      </section >
   )
};
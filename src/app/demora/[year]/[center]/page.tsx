import { AccessibilitatChart } from "./accessibilitatChart";

export default async function Accessibilitat({ children, params }: any) {
   const { year, center } = params;
   return (
      <div className="bg-bgLight rounded-md p-3 mb-2">
         <AccessibilitatChart
            name={'aa'}
            data={'aa'}
            setter={'aa'}
         />
      </div>
   );
}
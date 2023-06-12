import GetLinks from "./routing"

export default async function ContractsLayout({ children }: any) {

   return (
      <div>
         <title>Indicadors Contracte</title>
         <div className="h-20 bg-white bg-opacity-40 text-right flex justify-end items-center">
            <h1 className="right-0 w-auto mr-10 font-semibold text-2xl italic">Indicadors Contracte</h1>
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2 border-gray-600" />
         <GetLinks />
         <main>
            {children}
         </main>
      </div>
   )
}

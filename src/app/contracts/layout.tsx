import GetLinks from "./routing"

export default async function ContractsLayout({ children }: any) {

   return (
      <html>
         <head>
            <title>Indicadors Contracte</title>
         </head>
         <body>
            <GetLinks />
            <main>
               {children}
            </main>
         </body>
      </html>
   )
}

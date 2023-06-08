import Link from "next/link"

const links = [{
   label: '2022',
   route: '/contracts/2022'
},
{
   label: '2023',
   route: '/contracts/2023'
}]

const navTitlesIcons = [
   {
      name: 'Indicadors Contracte',
      icon: FaCapsules
   },
   {
      name: 'Professionals',
      icon: FaUserNurse
   }
]
const navTitlesIconsFarma = [
   {
      name: 'Els Meus Centres',
      icon: RiHospitalFill
   },
   {
      name: 'IQF',
      icon: BiCapsule
   },
   {
      name: 'Comparació',
      icon: IoGitCompare
   },
   {
      name: 'Arxius',
      icon: AiOutlineFolder
   }
]

export default async function ContractsLayout({ children }: any) {

   return (
      <html>
         <head>
            <title>Indicadors Contracte</title>
         </head>
         <body>
            <ul>
               {links.map(({ label, route }) => (
                  <li key={route}>
                     <Link href={route}>
                        {label}
                     </Link>
                  </li>
               ))}
            </ul>
            <main>
               {children}
            </main>
         </body>
      </html>
   )
}
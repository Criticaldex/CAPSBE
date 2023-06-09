'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';
import { BiCapsule, BiPlusMedical } from "react-icons/bi"
import { FaCapsules, FaUserNurse } from "react-icons/fa"
import { RiHospitalFill } from "react-icons/ri"
import { IoGitCompare } from "react-icons/io5"
import { AiOutlineFolder } from "react-icons/ai"
import { RxExit } from "react-icons/rx"

export default function GetLinks() {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : ['', 'contracts', '2023', '0'];
   const center = (pathArray[3]) ? pathArray[3] : process.env.CONTRACTS_DEFAULT_CENTER;

   const links = [{
      label: '2022',
      route: `/contracts/2022/${center}`
   },
   {
      label: '2023',
      route: `/contracts/2023/${center}`
   }]

   return (
      <ul className="m-auto w-11/12 flex flex-wrap items-end justify-end my-2 text-black border-gray-900 rounded-md">
         {links.map(({ label, route }: any) => (
            <Link key={route} href={route}>
               <li className="border border-blue-400 bg-blue-700 my-3 mx-4 py-2 px-5 rounded text-white hover:bg-blue-600">
                  {label}
               </li>
            </Link>
         ))}
      </ul>
   )
}

export function GetNav() {

   const navTitlesIcons = [
      {
         name: 'Indicadors Contracte',
         icon: FaCapsules,
         ruta: 'http://localhost/contracts/2023/0'
      },
      {
         name: 'Professionals',
         icon: FaUserNurse,
         ruta: 'https://trial.soidemdt.com:4000/professionals'
      }
   ]
   const navTitlesIconsFarma = [
      {
         name: 'Els Meus Centres',
         icon: RiHospitalFill,
         ruta: 'https://trial.soidemdt.com:4000/despesa'
      },
      {
         name: 'IQF',
         icon: BiCapsule,
         ruta: 'https://trial.soidemdt.com:4000/indicadors'
      },
      {
         name: 'Comparació',
         icon: IoGitCompare,
         ruta: 'https://trial.soidemdt.com:4000/comparaciones'
      },
      {
         name: 'Arxius',
         icon: AiOutlineFolder,
         ruta: 'https://trial.soidemdt.com:4000/archivos'
      }
   ]


   return (
      <div className="fixed top-0 left-0 z-50 w-16 h-screen bg-nav pt-4 pr-3 pb-0 pl-0 hover:w-80 transition-all duration-500">
         <nav className="text-white p-3 flex flex-col justify-between h-full overflow-hidden">
            <div>
               <Link href="" className="text-yellow-500 text-xl font-bold grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-7 pl-2">
                  <BiPlusMedical size={30} />
                  <span className="text-2xl">CAPFA</span>
               </Link>
               <div className="flex flex-col justify-between" id="lista">
                  {navTitlesIcons.map((navTI, index) => (
                     <Link key={index} href={navTI.ruta} className="hover:text-customBlue pb-6 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pl-3 items-center">
                        <navTI.icon size={20} />
                        <span className="text-lg">
                           {navTI.name}
                        </span>
                     </Link>
                  ))}
                  <hr className="my-4" />
                  <h3 className="pt-2 pb-4 ml-16 text-xl italic font-bold">Farmàcia</h3>
                  {navTitlesIconsFarma.map((navTI, index) => (
                     <Link key={index} href='' className="hover:text-customBlue pb-6 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0  pl-3 items-center">
                        <navTI.icon size={20} />
                        <span className="text-lg">
                           {navTI.name}
                        </span>
                     </Link>
                  ))}
               </div>
            </div>
            <a href="#" className="hover:text-customBlue py-2 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-2 pl-3 items-center">
               <RxExit size={25} />
               <span className="text-2x1">Sortir</span>
            </a>
         </nav>
      </div>
   )

}

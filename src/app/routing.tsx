'use client'
import Link from "next/link"
import { BiCapsule, BiPlusMedical } from "react-icons/bi"
import { FaCapsules, FaUserNurse } from "react-icons/fa"
import { RiHospitalFill } from "react-icons/ri"
import { IoGitCompare } from "react-icons/io5"
import { AiOutlineFolder } from "react-icons/ai"
import { RxExit } from "react-icons/rx"
import {
   LoginButton,
   LogoutButton,
   ProfileButton,
   RegisterButton,
} from "@/components/buttons.component";

export default function GetNav() {

   const navTitlesIcons = [
      {
         label: 'Indicadors Contracte',
         icon: FaCapsules,
         route: '/contracts'
      },
      {
         label: 'Professionals',
         icon: FaUserNurse,
         route: '/profesionals'
      }
   ]
   const navTitlesIconsFarma = [
      {
         label: 'Els Meus Centres',
         icon: RiHospitalFill,
         route: ''
      },
      {
         label: 'IQF',
         icon: BiCapsule,
         route: ''
      },
      {
         label: 'Comparació',
         icon: IoGitCompare,
         route: ''
      },
      {
         label: 'Arxius',
         icon: AiOutlineFolder,
         route: ''
      }
   ]


   return (
      <div className="fixed top-0 left-0 z-50 w-16 h-screen bg-nav pt-4 pr-3 pb-0 pl-0 hover:w-80 transition-all duration-500">
         <nav className="text-textColor p-3 flex flex-col justify-between h-full overflow-hidden">
            <div>
               <Link href="" className="text-yellowCustom text-xl font-bold grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-7 pl-2">
                  <BiPlusMedical size={30} />
                  <span className="text-2xl">CAPFA</span>
               </Link>
               <div className="flex flex-col justify-between" id="lista">
                  {navTitlesIcons.map((navTI) => (
                     <Link key={navTI.route} href={navTI.route} className="hover:text-darkBlue pb-6 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pl-3 items-center">
                        <navTI.icon size={20} />
                        <span className="text-lg">
                           {navTI.label}
                        </span>
                     </Link>
                  ))}
                  <hr className="my-4 border-textColor" />
                  <h3 className="pt-2 pb-4 ml-16 text-xl italic font-bold">Farmàcia</h3>
                  {navTitlesIconsFarma.map((navTI) => (
                     <Link key={navTI.route} href='navTI.route' className="hover:text-darkBlue pb-6 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0  pl-3 items-center">
                        <navTI.icon size={20} />
                        <span className="text-lg">
                           {navTI.label}
                        </span>
                     </Link>
                  ))}
               </div>
            </div>
            <div>
               <LoginButton />
               <RegisterButton />
               <LogoutButton />
               <ProfileButton />
            </div>
         </nav>
      </div>
   )
}

'use client'
import Link from "next/link"

import { BiPlusMedical } from "react-icons/bi"
import { FaCapsules, FaUserNurse, FaPhoneAlt, FaUnlock, FaUserClock, FaFileMedical, FaMoneyBillWave, FaMoneyCheck } from "react-icons/fa"
import { TbLayoutDashboard } from "react-icons/tb"
import { RiMedicineBottleLine } from "react-icons/ri"

import { usePathname } from "next/navigation"
import { LogoutButton, ProfileButton } from "@/components/loginbuttons.component";
import { NextAuthProvider } from "@/app/providers";

export default function GetNav({ session }: any) {
   const pathname = usePathname();
   const callsCenters = ['Capsbe', 'Demo']
   const financesCenters = ['Capsbe', 'Demo']
   const navTitlesIcons = [
      {
         label: 'Dashboard',
         icon: TbLayoutDashboard,
         route: '/dashboard'
      },
      {
         label: 'Professionals',
         icon: FaUserNurse,
         route: '/professionals'
      },
      {
         label: 'Accessibilitat\ni Demora',
         icon: FaUserClock,
         route: '/demora'
      },
      {
         label: 'Ordres Clíniques',
         icon: FaFileMedical,
         route: '/ordres'
      },
   ]
   {
      callsCenters.includes(session?.user.db) &&
         navTitlesIcons.push(
            {
               label: 'Trucades',
               icon: FaPhoneAlt,
               route: '/calls'
            }
         )
   }

   const navTitlesIconsFarma = [
      {
         label: 'IQF',
         icon: FaCapsules,
         route: '/iqf'
      }, {
         label: 'Seguretat',
         icon: FaUnlock,
         route: '/seguretat'
      }
   ]

   const navTitlesIconsFinances = [
      {
         label: 'Inversions',
         icon: FaMoneyCheck,
         route: '/inversions'
      }
   ]

   return (
      <div className="group fixed top-0 left-0 z-50 w-16 h-screen bg-bgNavGlobal pt-4 pr-3 pb-0 pl-0 hover:w-52 transition-all duration-500 scroll-menu overflow-y-auto">
         <nav className="text-TextNav flex flex-col justify-between h-full overflow-x-hidden">
            <div>
               <Link href="/" className="text-yellow text-xl font-bold grid grid-cols-[max-content_max-content] place-items-cente gap-x-4 pt-2 pr-0 pb-7 pl-3 ml-3">
                  <BiPlusMedical size={20} />
                  <span className="text-lg">ARIADN&apos;AP</span>
               </Link>
               <div className="flex flex-col justify-between" id="lista">
                  {navTitlesIcons.map((navTI) => (
                     <Link key={navTI.route} href={navTI.route} className={`hover:text-darkBlue transition-all duration-300 pb-6 grid grid-cols-[max-content_max-content] place-items-center gap-x-4 pt-2 pr-0 pl-3 items-center ml-3
                     ${pathname?.includes(navTI.route) ? 'text-darkBlue' : ''}`}>
                        <navTI.icon size={19} />
                        <span className="text-base whitespace-pre-line">
                           {navTI.label}
                        </span>
                     </Link>
                  ))}
                  <hr className="my-4 ml-2 border-spacerNav" />
                  <div className="text-lg grid grid-cols-[max-content_max-content] place-items-cente gap-x-4 pt-2 pr-0 pb-7 pl-3 ml-3">
                     <small className="text-nav transition-all duration-300 uppercase tracking-widest group-hover:text-yellow2">
                        Farmàcia
                     </small>
                  </div>
                  {navTitlesIconsFarma.map((navTI) => (
                     <Link key={navTI.label} href={navTI.route} className={`hover:text-darkBlue transition-all duration-300 pb-6 grid grid-cols-[max-content_max-content] place-items-cente gap-x-4 pt-2 pr-0  pl-3 items-center ml-3
                     ${pathname?.includes(navTI.route) ? 'text-darkBlue' : ''}`}>
                        <navTI.icon size={19} />
                        <span className="text-base">
                           {navTI.label}
                        </span>
                     </Link>
                  ))}

                  {financesCenters.includes(session?.user.db) &&
                     <>
                        <hr className="my-4 ml-2 border-spacerNav" />
                        <div className="text-yellow text-lg grid grid-cols-[max-content_max-content] place-items-cente gap-x-4 pt-2 pr-0 pb-7 pl-3 ml-3">
                           <small className="text-nav transition-all duration-300 uppercase tracking-widest group-hover:text-yellow2">
                              Finances
                           </small>
                        </div>
                        {navTitlesIconsFinances.map((navTI) => (
                           <Link key={navTI.label} href={navTI.route} className={`hover:text-darkBlue transition-all duration-300 pb-6 grid grid-cols-[max-content_max-content] place-items-cente gap-x-4 pt-2 pr-0  pl-3 items-center ml-3
                     ${pathname?.includes(navTI.route) ? 'text-darkBlue' : ''}`}>
                              <navTI.icon size={19} />
                              <span className="text-base">
                                 {navTI.label}
                              </span>
                           </Link>
                        ))}
                     </>
                  }
               </div>
            </div>
            <div>
               <NextAuthProvider>
                  <div>
                     <ProfileButton />
                     <LogoutButton />
                  </div>
               </NextAuthProvider>
            </div>
         </nav>
      </div>
   )
}

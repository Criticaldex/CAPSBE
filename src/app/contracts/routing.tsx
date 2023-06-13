'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';

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
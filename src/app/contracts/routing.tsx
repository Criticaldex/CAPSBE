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

      <ul>
         {links.map(({ label, route }: any) => (
            <li key={route}>
               <Link href={route}>
                  {label}
               </Link>
            </li>
         ))}
      </ul>
   )
}

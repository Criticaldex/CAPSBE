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
            <Link className={`my-1 mx-4 py-2 px-5 rounded-md text-textColor font-bold
            ${pathname?.includes(route) ? 'bg-darkBlue text-white' : 'bg-black bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`} key={route} href={route}>
               <li>
                  {label}
               </li>
            </Link>
         ))}
      </ul>
   )
}


export function CenterChartButtons({ year, centros }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : ['', 'contracts', '2023', '0'];
   const center = (pathArray[3]) ? pathArray[3] : process.env.CONTRACTS_DEFAULT_CENTER;


   return (
      <div className="text-center m-auto absolute z-10 mt-3">
         {centros.map((centro: any, i: number) => (
            <Link href={centro.link} key={i} className={`rounded-lg ml-3 py-2 px-5 bg-blue-600 font-bold
               ${pathname?.includes(centro.link) ? 'bg-opacity-90' : 'bg-opacity-50 hover:bg-opacity-70'}`}>
               {centro.name}
            </Link>
         ))}
      </div>
   )
}

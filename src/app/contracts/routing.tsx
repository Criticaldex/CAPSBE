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
      <div className="flex justify-end m-auto mr-3 my-2">
         {links.map(({ label, route }: any) => (
            <Link className={`my-1 mx-4 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(route) ? 'bg-darkBlue text-white' : 'bg-bgDark bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`} key={route} href={route}>
               {label}
            </Link>
         ))}
      </div>
   )
}


export function CenterChartButtons({ year, centros }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : ['', 'contracts', '2023', '0'];
   const center = (pathArray[3]) ? pathArray[3] : process.env.CONTRACTS_DEFAULT_CENTER;


   return (
      <div className="text-center m-auto absolute z-10 mt-4">
         {centros.map((centro: any, i: number) => (
            <Link href={centro.link} key={i} className={`my-1 mx-4 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
               ${pathname?.includes(centro.link) ? 'bg-darkBlue text-white' : 'bg-bgDark bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`}>
               {centro.name}
            </Link>
         ))}
      </div>
   )
}

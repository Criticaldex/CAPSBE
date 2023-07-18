'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESSIONALS_DEFAULT_CENTER;

   let links: object[] = [];
   years.map((label: any) => (
      links.push({
         label: label,
         route: `/dashboard/${label}`
      })
   ))

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

export function GetLinksCenters(centros: any) {
   const pathname = usePathname();

   let links: any[] = [];

   centros.centros.map(({ id, name, link }: any) => (
      links.push({
         label: name,
         route: link
      })
   ))

   return (
      <div className="text-center m-auto absolute z-10 my-4" >
         {links.map((centro: any, i: number) => (
            <Link href={centro.route} key={i} className={`my-1 mx-4 py-2.5 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(centro.route) ? 'bg-darkBlue text-white' : 'bg-bgDark bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`}>
               {centro.label}
            </Link>
         ))}
      </div>
   )
}
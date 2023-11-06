'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const up = (pathArray[3]) ? pathArray[3] : null;

   let links: object[] = [];
   years.map((label: any) => (
      links.push({
         label: label,
         route: `/admin/professionals/${up}/${label}`
      })
   ))

   return (
      <div className="flex">
         {links.map(({ label, route }: any) => (
            <Link className={`my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(route) ? 'bg-darkBlue text-textColor' : 'bg-bgDark hover:bg-bgLight'}`} key={route} href={route}>
               {label}
            </Link>
         ))}
      </div>
   )
}

export function GetLinksCenters({ centros }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const year = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_YEAR;

   let links: any[] = [];

   centros.forEach((centro: any) => {
      links.push({
         label: centro.name,
         route: `/admin/professionals/${centro.id}/${year}`
      })
   });

   return (
      <div className="flex" >
         {links.map((centro: any, i: number) => (
            <Link href={centro.route} key={i} className={`my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(centro.route) ? 'bg-darkBlue text-textColor' : 'bg-bgDark hover:bg-bgLight'}`}>
               {centro.label}
            </Link>
         ))}
      </div>
   )
}
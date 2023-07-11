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
         route: `/contracts/${label}/${center}`
      })
   ))

   return (
      <ul className="m-auto w-11/12 flex flex-wrap items-end justify-end my-2 rounded-md">
         {links.map(({ label, route }: any) => (
            <Link className={
               `border border-darkBlue my-1 mx-4 py-2 px-5 rounded-md text-textColor
               ${pathname?.includes(label) ? 'bg-darkBlue' : 'hover:bg-bgLight bg-bgDark'}`}
               key={route} href={route}>
               <li> {label} </li>
            </Link >
         ))}
      </ul >
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
      <ul className="m-auto w-11/12 flex flex-wrap items-end justify-end my-2 rounded-md">
         {links.map(({ label, route }: any, i: number) => (
            <Link className={`border border-darkBlue my-1 mx-4 py-2 px-5 rounded-md text-textColor
            ${pathname?.includes(route) ? 'bg-darkBlue' : 'hover:bg-bgLight bg-bgDark'}`}
               key={i} href={route}>
               <li> {label} </li>
            </Link>
         ))}
      </ul>
   )
}
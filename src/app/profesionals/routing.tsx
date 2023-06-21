'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';

export function GetLinksView() {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESIONALS_DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESIONALS_DEFAULT_SECTION;

   const links = [
      {
         label: 'Global',
         route: `/profesionals/global/${center}/${section}`
      },
      {
         label: 'Individual',
         route: `/profesionals/individual/${center}/${section}`
      }
   ]

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

export function GetLinksCentro({ centros }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESIONALS_DEFAULT_VIEW;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESIONALS_DEFAULT_SECTION;

   let links = [
      {
         label: 'Todos',
         route: `/profesionals/${view}/all/${section}`
      }
   ];

   centros.map(({ id, name }: any) => (
      links.push({
         label: name,
         route: `/profesionals/${view}/${id}/${section}`
      })
   ))

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

export function GetLinksSection({ sections }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESIONALS_DEFAULT_CENTER;

   let links: object[] = [];
   sections.map((label: any) => (
      links.push({
         label: label,
         route: `/profesionals/${view}/${center}/${label.replaceAll(' ', '_')}`
      })
   ))

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

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESIONALS_DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESIONALS_DEFAULT_SECTION;

   let links: object[] = [];
   years.map((label: any) => (
      links.push({
         label: label,
         route: `/profesionals/${view}/${center}/${section}/${label}`
      })
   ))

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

export function GetLinksProfesionals({ profesionals }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESIONALS_DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESIONALS_DEFAULT_SECTION;
   const year = (pathArray[5]) ? pathArray[5] : process.env.PROFESIONALS_DEFAULT_YEAR;

   let links: object[] = [];
   profesionals.map((label: any) => (
      links.push({
         label: label,
         route: `/profesionals/${view}/${center}/${section}/${year}/${label.split('(').pop().split(')')[0]}`
      })
   ))

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
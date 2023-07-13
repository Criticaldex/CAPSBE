'use client'
import Link from "next/link"
import { usePathname } from 'next/navigation';
import React from "react";

export function GetLinksView() {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESSIONALS_DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;

   const links = [
      {
         label: 'Global',
         route: `/professionals/global/${center}/${section}`
      },
      {
         label: 'Individual',
         route: `/professionals/individual/${center}/${section}`
      }
   ]

   return (
      <ul className="flex flex-col h-8 my-2 bg-nav ml-[2px] rounded-r-md w-fit overflow-hidden z-10 text-center hover:rounded-b-md hover:h-[7.3rem] transition-all duration-500">
         <h4 className="text-textColor mx-4 py-1 cursor-default font-bold">Professionals <span>&#11167;</span></h4>
         {links.map(({ label, route }: any) => (
            <Link className={`${pathname?.includes(route) ? 'bg-darkBlue text-white' : 'hover:bg-hover'}`} key={route} href={route}>
               <hr className="w-10/12 m-auto" />
               <li className="py-2 px-5">
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
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;

   let links = [
      {
         label: 'Todos',
         route: `/professionals/${view}/all/${section}`
      }
   ];

   centros.map(({ id, name }: any) => (
      links.push({
         label: name,
         route: `/professionals/${view}/${id}/${section}`
      })
   ))

   return (
      <ul className="transition-all duration-500 flex flex-col my-2 bg-nav rounded-s-md w-fit h-8 overflow-hidden z-10 text-center hover:rounded-b-md hover:h-[9.9rem]">
         <h4 className="text-textColor mx-4 py-1 cursor-default font-bold">Centros <span>&#11167;</span></h4>
         {links.map(({ label, route }: any) => (
            <Link className={`${pathname?.includes(route) ? 'bg-darkBlue text-textColor' : 'hover:bg-hover'} px-1`} key={route} href={route}>
               <hr className="w-10/12 m-auto" />
               <li className="py-2 px-5">
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
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESSIONALS_DEFAULT_CENTER;

   let links: object[] = [];
   sections.map((label: any) => (
      links.push({
         label: label,
         route: `/professionals/${view}/${center}/${label.replaceAll(' ', '_')}`
      })
   ))

   return (
      <ul className="w-full flex flex-wrap justify-between px-4 my-2 rounded-md">
         {links.map(({ label, route }: any) => (
            <Link className={`w-1/5 pr-1 my-3 py-1 px-5 rounded text-xl ${pathname?.includes(route) ? 'border-b-4 border-darkBlue bg-gradient-to-b from-pestanaDark to-pestanaLight text-white text-center' : 'border-b-2 border-contrario text-textColor2 text-center hover:bg-gradient-to-b hover:from-pestanaHover hover:to-transparent'}`} key={route} href={route}>
               <li className="w-100 ">
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
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESSIONALS_DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;
   const professional = (pathArray[6]) ? pathArray[6] : '';

   let links: object[] = [];
   years.map((label: any) => (
      links.push({
         label: label,
         route: `/professionals/${view}/${center}/${section}/${label}/${professional}`
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
         ))
         }
      </ul >
   )
}

export function GetLinksProfessionals({ professionals }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.PROFESSIONALS_DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;
   const year = (pathArray[5]) ? pathArray[5] : process.env.PROFESSIONALS_DEFAULT_YEAR;

   let links: object[] = [];
   professionals.map((label: any) => (
      links.push({
         label: label,
         code: label.split('(').pop().split(')')[0],
         route: `/professionals/${view}/${center}/${section}/${year}/${label.split('(').pop().split(')')[0]}`
      })
   ))

   return (
      <ul id="scrollDiv" className="max-h-[41rem] overflow-y-scroll m-auto w-11/12 bg-bgLight rounded-md py-1">
         {links.map(({ label, code, route }: any) => (
            <Link className="w-full" key={route} href={route}>
               <li className={`border-b border-darkBlue mx-3 py-4 px-3 text-textColor ${pathname?.includes(code) ? 'bg-darkBlue text-textColor' : 'hover:bg-hover'}`}>
                  {label}
               </li>
            </Link>
         ))}
      </ul>
   )
}

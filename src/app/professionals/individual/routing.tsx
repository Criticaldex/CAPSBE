'use client'
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";

export function GetLinksView() {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_CENTER;
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
      <>
         <label className="flex">
            <select value={`/professionals/${view}/${center}/${section}`}
               className={'my-1 mr-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {links.map(({ label, route }: any) => {
                  return <option key={label} value={route}>
                     {label}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}

export function GetLinksCentro({ centros }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const centro = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;
   const year = (pathArray[5]) ? pathArray[5] : process.env.DEFAULT_YEAR;

   return (
      <>
         <label className="flex">
            <select value={`/professionals/${view}/${centro}/${section}/${year}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {centros.map(({ id, name }: any) => {
                  return <option key={id} value={`/professionals/${view}/${id}/${section}/${year}`}>
                     {name}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}

export function GetLinksSection({ sections }: any) {
   const pathname = usePathname();
   const router = useRouter();

   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_CENTER;
   const sect = (pathArray[4]) ? pathArray[4] : sections[0].replaceAll(' ', '_');
   const year = (pathArray[5]) ? pathArray[5] : process.env.DEFAULT_YEAR;

   // eslint-disable-next-line react-hooks/exhaustive-deps
   let links: object[] = [];
   sections.map((label: any) => (
      links.push({
         label: label,
         route: `/professionals/${view}/${center}/${label.replaceAll(' ', '_')}/${year}`
      })
   ))

   useEffect(() => {
      if (!links.filter((link: any) => pathname?.includes(link.route)).length)
         router.push(`/professionals/${view}/${center}/${sections[0].replaceAll(' ', '_')}/${year}`)
   }, [center, links, pathname, router, sections, view, year]);

   return (
      <>
         <label>
            <select value={`/professionals/${view}/${center}/${sect}/${year}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {sections.map((section: any) => {
                  return <option key={section} value={`/professionals/${view}/${center}/${section.replaceAll(' ', '_')}/${year}`}>
                     {section}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;
   const any = (pathArray[5]) ? pathArray[5] : process.env.DEFAULT_YEAR;
   const professional = (pathArray[6]) ? pathArray[6] : '';

   return (
      <>
         {view == 'individual' &&
            <label className="flex">
               <select value={`/professionals/${view}/${center}/${section}/${any}/${professional}`}
                  className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
                  onChange={e => {
                     router.push(e.target.value)
                  }}>

                  {years.map((year: any) => {
                     return <option key={year} value={`/professionals/${view}/${center}/${section}/${year}/${professional}`}>
                        {year}
                     </option>
                  })}
               </select>
            </label>
         }
      </>
   );
}

export function GetLinksProfessionals({ professionals }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const view = (pathArray[2]) ? pathArray[2] : process.env.PROFESSIONALS_DEFAULT_VIEW;
   const center = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_CENTER;
   const section = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;
   const year = (pathArray[5]) ? pathArray[5] : process.env.DEFAULT_YEAR;

   // eslint-disable-next-line react-hooks/exhaustive-deps
   let links: object[] = [];
   professionals.map((label: any) => (
      links.push({
         label: label,
         code: label.split('(').pop().split(')')[0],
         route: `/professionals/${view}/${center}/${section}/${year}/${label.split('(').pop().split(')')[0]}`
      })
   ))

   useEffect(() => {
      if (!links.filter((link: any) => pathname?.includes(link.route)).length)
         router.push(`/professionals/${view}/${center}/${section}/${year}/${professionals[0].split('(').pop().split(')')[0]}`)
   }, [center, links, pathname, professionals, router, section, view, year]);

   return (
      <ul id="scrollDiv" className="overflow-y-scroll h-[41rem] bg-bgDark rounded-md">
         {links.map(({ label, code, route }: any) => (
            <Link className="w-full rounded-md text-textColor" key={route} href={route}>
               <li className={`rounded-md  border-darkBlue mx-3 py-4 px-3 text-textColor ${pathname?.includes(code) ? 'bg-darkBlue text-textColor' : 'bg-bgDark hover:bg-bgLight'}`}>
                  {label}
               </li>
            </Link>
         ))}
      </ul>
   )
}

export function GetCenter({ centros }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const center = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_CENTER;

   var centro = 'Tots';

   if (center != 'all') {
      centros.forEach((element: any) => {
         if (element.id == center) centro = element.name
      });
   }

   return (
      <h1 className="right-0 w-auto mr-10 font-semibold text-2xl italic">{centro}</h1>
   )
}
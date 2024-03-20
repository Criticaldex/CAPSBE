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

   return (
      <>
         <label className="flex">
            <select value={`/professionals/${view}/${centro}/${section}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {centros.map(({ id, name }: any) => {
                  return <option key={id} value={`/professionals/${view}/${id}/${section}`}>
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

   // eslint-disable-next-line react-hooks/exhaustive-deps
   let links: object[] = [];
   sections.map((label: any) => (
      links.push({
         label: label,
         route: `/professionals/${view}/${center}/${label.replaceAll(' ', '_')}`
      })
   ))

   useEffect(() => {
      if (!links.filter((link: any) => pathname?.includes(link.route)).length)
         router.push(`/professionals/${view}/${center}/${sections[0].replaceAll(' ', '_')}`)
   }, [center, links, pathname, router, sections, view]);

   return (
      <>
         <label>
            <select value={`/professionals/${view}/${center}/${sect}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {sections.map((section: any) => {
                  return <option key={section} value={`/professionals/${view}/${center}/${section.replaceAll(' ', '_')}`}>
                     {section}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}
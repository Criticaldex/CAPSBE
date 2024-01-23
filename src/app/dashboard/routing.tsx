'use client'
import Link from "next/link"
import { usePathname, useRouter } from 'next/navigation';

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const section = (pathArray[4]) ? pathArray[4] : process.env.DASHBOARD_DEFAULT_SECTION;
   const any = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_YEAR;
   const up = (pathArray[2]) ? pathArray[2] : null;

   return (
      <>
         <label className="flex">
            <select value={`/dashboard/${up}/${any}/${section}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {years.map((year: any) => {
                  return <option key={year} value={`/dashboard/${up}/${year}/${section}`}>
                     {year}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}

export function GetLinksCenters({ centros }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const up = (pathArray[2]) ? pathArray[2] : null;
   const year = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_YEAR;
   const section = (pathArray[4]) ? pathArray[4] : process.env.DASHBOARD_DEFAULT_SECTION;

   let links: any[] = [];

   centros.forEach((centro: any) => {
      if (centro.name != 'Pediatria') {
         links.push({
            label: centro.name,
            route: `/dashboard/${centro.id}/${year}/${section}`
         })
      }
   });

   return (
      <>
         <label className="flex">
            <select value={`/dashboard/${up}/${year}/${section}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {centros.map((centro: any) => {
                  return <option key={centro.name} value={`/dashboard/${centro.id}/${year}/${section}`}>
                     {centro.name}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}

export function GetLinksCenters_OLD({ centros }: any) {
   const pathname = usePathname();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const year = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_YEAR;
   const section = (pathArray[4]) ? pathArray[4] : process.env.DASHBOARD_DEFAULT_SECTION;

   let links: any[] = [];

   centros.forEach((centro: any) => {
      if (centro.name != 'Pediatria') {
         links.push({
            label: centro.name,
            route: `/dashboard/${centro.id}/${year}/${section}`
         })
      }
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

export function GetSectionButtons() {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const year = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_YEAR;
   const center = (pathArray[2]) ? pathArray[2] : null;
   const group = (pathArray[4]) ? pathArray[4] : null;

   let links: object[] = [{
      label: 'General',
      route: `/dashboard/${center}/${year}/general`
   }, {
      label: 'CPR',
      route: `/dashboard/${center}/${year}/cpr`
   }, {
      label: 'Sense CPR',
      route: `/dashboard/${center}/${year}/nocpr`
   }];

   return (
      <>
         <label>
            Grup:{' '}
            <select value={`/dashboard/${center}/${year}/${group}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {links.map((link: any) => {
                  return <option key={link.route} value={link.route}>
                     {link.label}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}
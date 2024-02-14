'use client'
import { usePathname, useRouter } from 'next/navigation';

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const any = (pathArray[2]) ? pathArray[2] : process.env.DEFAULT_YEAR;
   const centre = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_CENTER;

   return (
      <>
         <label>
            <select value={`/demora/${any}/${centre}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {years.map((year: any) => {
                  return <option key={year} value={`/demora/${year}/${centre}`}>
                     {year}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}

export function GetLinksCenters({ centers }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const any = (pathArray[2]) ? pathArray[2] : process.env.DEFAULT_YEAR;
   const centre = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_CENTER;

   return (
      <>
         <label>
            <select value={`/demora/${any}/${centre}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {centers.map((center: any) => {
                  return <option key={center.id} value={`/demora/${any}/${center.id}`}>
                     {center.name}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}
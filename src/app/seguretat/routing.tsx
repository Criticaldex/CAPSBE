'use client'
import { usePathname, useRouter } from 'next/navigation';

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const any = (pathArray[2]) ? pathArray[2] : process.env.DEFAULT_YEAR;

   return (
      <>
         <label>
            <select value={`/seguretat/${any}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {years.map((year: any) => {
                  return <option key={year} value={`/seguretat/${year}`}>
                     {year}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}
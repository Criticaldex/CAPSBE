'use client'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const any = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_YEAR;

   return (
      <>
         <label>
            Any:{' '}
            <select value={`/admin/dashboard/${any}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {years.map((year: any) => {
                  return <option key={year} value={`/admin/dashboard/${year}`}>
                     {year}
                  </option>
               })}
            </select>
         </label>
      </>
   );
}
'use client'
import { usePathname, useRouter } from 'next/navigation';

export function GetLinksCenters({ centers }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const centre = (pathArray[2]) ? pathArray[2] : process.env.DEFAULT_CENTER;

   return (
      <>
         <label>
            <select value={`/demora/${centre}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {centers.map((center: any) => {
                  return <option key={center.id} value={`/demora/${center.id}`}>
                     {center.name}
                  </option>
               })}
            </select>
         </label>
      </>
   )
}
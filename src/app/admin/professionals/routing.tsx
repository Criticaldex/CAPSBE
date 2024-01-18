'use client'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation'

export function GetLinksYears({ years }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const any = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_YEAR;
   const sector = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;

   return (
      <>
         <label>
            Any:{' '}
            <select value={`/admin/professionals/${any}/${sector}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {years.map((year: any) => {
                  return <option key={year} value={`/admin/professionals/${year}/${sector}`}>
                     {year}
                  </option>
               })}
            </select>
         </label>
      </>
   );
}

export function GetLinksSections({ sections }: any) {
   const pathname = usePathname();
   const router = useRouter();
   const pathArray: string[] = (pathname) ? pathname.split('/') : [];
   const any = (pathArray[3]) ? pathArray[3] : process.env.DEFAULT_YEAR;
   const sector = (pathArray[4]) ? pathArray[4] : process.env.PROFESSIONALS_DEFAULT_SECTION;

   return (
      <>
         <label>
            Sector:{' '}
            <select value={`/admin/professionals/${any}/${sector}`}
               className={'my-1 mx-2 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark hover:bg-bgLight'}
               onChange={e => {
                  router.push(e.target.value)
               }}>

               {sections.map((section: any) => {
                  return <option key={section} value={`/admin/professionals/${any}/${section.replaceAll(' ', '_')}`}>
                     {section}
                  </option>
               })}
            </select>
         </label>
      </>
   );
}
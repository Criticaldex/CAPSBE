'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function GetLinkCenter({ center }: any) {
   const pathname = usePathname();
   const label = 'Detall';
   const route = `/demora/${center}`;
   if (pathname?.includes(route)) {
      return (
         <Link className={`my-1 mx-4 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(route) ? 'bg-darkBlue text-textColor' : 'bg-bgDark bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`} key={route} href={'/demora'}>
            {label}
         </Link>
      )
   } else {
      return (
         <Link className={`my-1 mx-4 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue
            ${pathname?.includes(route) ? 'bg-darkBlue text-textColor' : 'bg-bgDark bg-opacity-20 dark:bg-opacity-80 hover:bg-opacity-40'}`} key={route} href={route}>
            {label}
         </Link>
      )
   }

}
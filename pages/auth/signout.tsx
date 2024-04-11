import '../signin.css'
import { BiPlusMedical } from "react-icons/bi"
import { signOut } from "next-auth/react";

export default function SignOut() {

   return (
      <main>
         <div className="bg-image"></div>
         <div className="title">
            <BiPlusMedical size={50} className="icono" />
            <h1>ARIADN&apos;AP</h1>
         </div>
         <section>
            <h1>SIGN OUT</h1>
            <button className="hover:text-darkBlue py-2 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-2 pl-3 items-center ml-3"
               onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
               <span className="text-lg">
                  Sortir
               </span>
            </button>
         </section>
      </main>
   )
}
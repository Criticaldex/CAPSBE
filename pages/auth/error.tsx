import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken } from "next-auth/react"
import '../signin.css'
import { BiPlusMedical } from "react-icons/bi"
import { useRouter } from "next/router";



export default function SignInError({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
   const router = useRouter();
   const { error } = router.query;

   return (
      <main>
         <div className="bg-image"></div>
         <div className="title">
            <BiPlusMedical size={50} className="icono" />
            <h1>ARIADN&apos;AP</h1>
         </div>
         <section>
            <h1>SIGN IN</h1>
            <form method="post" action="/api/auth/callback/credentials">
               <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
               <div>
                  <input name="email" type="email" placeholder="Email" required />
               </div>
               <div>
                  <input name="password" type="password" placeholder="Contrasenya" required />
               </div>
               <div>
                  <button type="submit">Sign in</button>
               </div>
            </form>
            {error ?
               <div id="errorLogin">
                  {error}
               </div>
               :
               ''
            }
         </section>
      </main>
   )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
   const csrfToken = await getCsrfToken(context)
   return {
      props: { csrfToken },
   }
}
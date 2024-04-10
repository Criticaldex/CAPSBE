import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
   /**
    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    */
   interface Session {
      user: {
         name: string,
         lastname: string,
         email: string,
         password: string,
         license: {
            start: Date,
            end: Date,
         },
         configs: any,
         db: string,
         role: string,
         centre: string
      } & DefaultSession["user"]
   }
}
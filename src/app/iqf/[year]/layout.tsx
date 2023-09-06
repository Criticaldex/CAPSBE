
export default async function LayoutDashboard({ children, hiper, seleccio, universals }: any) {

   return (
      <article className="min-h-fit">
         {children}
         {universals}
         {hiper}
         {seleccio}
      </article>
   );
}

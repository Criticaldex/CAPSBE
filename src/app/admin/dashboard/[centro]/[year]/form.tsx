'use client';

import { IndicatorIface } from "@/schemas/indicator";
import { getAdminTable, updateIndicators } from "@/services/indicators";
import { useSession, getSession } from "next-auth/react"

export const UsersForm = ({ register, handleSubmit, errors, clearErrors, setRows, toast, isDirty, dirtyFields, reset }: any) => {
   const onSubmit = handleSubmit(async (data: IndicatorIface) => {
      if (isDirty) {
         const session = await getSession();
         console.log('session: ', session);
         data.dbName = session?.user.db as string;
         data.objectiu = Math.floor(data.objectiu);
         console.log('data: ', data);
         const update = await updateIndicators(data);
         if (update.lastErrorObject?.updatedExisting) {
            toast.success('Usuari Modificat!', { theme: "colored" });
         } else {
            toast.success('Usuari Afegit!', { theme: "colored" });
         }
         reset(update.value);
         setRows(await getAdminTable(data.any, data.centre, data.dbName));
      } else {
         toast.warning('No s\'ha Modificat cap camp!', { theme: "colored" });
      }
   });

   return (
      <form
         id="userForm"
         className="flex flex-col gap-4 grow rounded-md p-4 bg-bgLight"
         onSubmit={onSubmit}
      >
         <div className="inline-flex justify-end">
            <label htmlFor="codi" className="flex self-center">Id:</label>
            <input id="codi"
               type="text"
               disabled
               className={`text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4 basis-8/12 ${!errors.codi ? 'border-foreground' : 'border-red'}`}
               {...register("codi", {
                  required: 'Camp obligatori',
               })} />
         </div>
         {errors.codi && <p role="alert" className="text-red self-end">⚠ {errors.codi?.message}</p>}

         <div className="inline-flex justify-end">
            <label htmlFor="indicador" className="self-center">Nom:</label>
            <input id="indicador"
               type="indicador"
               disabled
               className={`text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4 basis-8/12 ${!errors.indicador ? 'border-foreground' : 'border-red'}`}
               {...register("indicador")} />
         </div>
         {errors.indicador && <p role="alert" className="text-red self-end">⚠ {errors.indicador?.message}</p>}

         <div className="inline-flex justify-end">
            <label htmlFor="any" className="self-center">Any:</label>
            <input id="any"
               className={`text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4 basis-8/12 ${!errors.any ? 'border-foreground' : 'border-red'}`}
               disabled
               {...register("any", {
                  required: 'Camp obligatori',
               })} />
         </div>
         {errors.any && <p role="alert" className="text-red self-end">⚠ {errors.any?.message}</p>}

         <div className="inline-flex justify-end">
            <label htmlFor="centre" className="self-center">Centre:</label>
            <input id="centre"
               className={`text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4 basis-8/12 ${!errors.centre ? 'border-foreground' : 'border-red'}`}
               disabled
               {...register("centre", {
                  required: 'Camp obligatori',
               })} />
         </div>
         {errors.centre && <p role="alert" className="text-red self-end">⚠ {errors.centre?.message}</p>}

         <div className="inline-flex justify-end">
            <label htmlFor="objectiu" className="self-center">Objectiu:</label>
            <input id="objectiu"
               className={`text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4 basis-8/12 ${!errors.objectiu ? 'border-foreground' : 'border-red'}`}
               {...register("objectiu", {
                  required: 'Camp obligatori',
                  pattern: {
                     value: /^[0-9\.]*$/i,
                     message: "Ha de ser un Numero"
                  }
               })} />
         </div>
         {errors.objectiu && <p role="alert" className="text-red self-end">⚠ {errors.objectiu?.message}</p>}
         <div className="inline-flex justify-end">
            <label htmlFor="invers" className="self-center">Invers:</label>
            <input id="invers"
               className={`text-textColor border-b-2 bg-bgDark rounded-md p-1 ml-4 basis-8/12`}
               {...register("invers")} type="checkbox" value="true" />
         </div>
         {errors.invers && <p role="alert" className="text-red self-end">⚠ {errors.invers?.message}</p>}

         <div className="inline-flex justify-around">
            <input type="reset" onClick={() => { clearErrors(); }} className={'my-1 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-bgDark'} value="Netejar" />
            <input className={'my-1 py-2 px-5 rounded-md text-textColor font-bold border border-darkBlue bg-darkBlue'} type="submit" value="Enviar" />
         </div>
      </form >
   );
};
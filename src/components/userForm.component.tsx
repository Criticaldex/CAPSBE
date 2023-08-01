'use client';

import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { UserIface } from "@/schemas/user";

export const UsersForm = ({ register, handleSubmit }: any) => {
   const onSubmit = handleSubmit((data: UserIface) => {
      alert(JSON.stringify(data));
   });

   return (
      <form
         id="userForm"
         className="flex flex-col gap-2 grow rounded-md p-2 bg-bgLight"
         onSubmit={onSubmit}
      >
         <label>Email</label>
         <input className="text-black" {...register("email")} />
         <label>Contrasenya</label>
         <input className="text-black" {...register("password")} />
         <label>Nom</label>
         <input className="text-black" {...register("name")} />
         <label>Cognom</label>
         <input className="text-black" {...register("lastname")} />
         <input type="submit" />
      </form>
   );
};
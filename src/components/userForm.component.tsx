'use client';

import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { UserIface } from "@/schemas/user";

type InputProps = {
   label: string;
   value: Path<UserIface>;
   register: UseFormRegister<UserIface>;
   required: boolean;
};

// The following component is an example of your existing Input Component
const Input = ({ label, value, register, required }: InputProps) => (
   <>
      <label className="text-center">{label}</label>
      <input id={value} className="text-black" {...register(value, { required })} />
   </>
);

export const UsersForm = ({ register, handleSubmit, user, data, setShowModal }: any) => {

   // const { register, handleSubmit, setValue } = useForm<UserIface>({
   //    defaultValues: data
   // });

   const onSubmit = handleSubmit((data: UserIface) => {
      alert(JSON.stringify(data));
   });

   return (
      <form
         id="userForm"
         className="flex flex-col gap-2 grow rounded-md p-2 bg-bgLight"
         onSubmit={onSubmit}
      >
         <button type="button" onClick={() => setShowModal(false)}>
            X Close
         </button>
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
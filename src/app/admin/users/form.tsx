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

export const UsersForm = (row: any) => {
   const { register, handleSubmit, setValue } = useForm<UserIface>();

   const onSubmit: SubmitHandler<UserIface> = data => {
      alert(JSON.stringify(data));
   };

   return (
      <form
         id="userForm"
         className="flex flex-col gap-2 grow rounded-md p-2 bg-bgLight"
         onSubmit={handleSubmit(onSubmit)}
      >
         <Input label="Email" value="email" register={register} required />
         <Input label="Contrasenya" value="password" register={register} required />
         <Input label="Nom" value="name" register={register} required={false} />
         <Input label="Cognom" value="lastname" register={register} required={false} />
         <button type="button" onClick={() => setValue("name", "Pepito")}>
            Set First Name Value
         </button>
         <input type="submit" />
      </form>
   );
};
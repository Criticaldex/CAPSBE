'use client'
import * as React from "react";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import { ModalForm } from "./ModalForm";
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

export default function Contracts() {
   const [modalFormData, setModalFormData] = React.useState("");
   const { watch, register, setValue, getValues, handleSubmit } = useForm<
      UserIface
   >();
   const [showModal, setShowModal] = React.useState(false);
   const { email, name, lastname } = watch();

   React.useEffect(() => {
      // customm register input will not be impatced by unmount
      register("name", { required: true });
   }, [register]);

   React.useEffect(() => {
      setValue("email", modalFormData);
   }, [setValue, modalFormData]);

   const onSubmit: SubmitHandler<UserIface> = data => {
      console.log(data);
   };

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <input type="checkbox" name="toggle" ref={register} />
            {(
               <button type="button" onClick={() => setShowModal(!showModal)}>
                  Show Modal
               </button>
            )}

            <input
               name="email"
               placeholder="email"
               {...register('email')}
            />

            <input
               name="keepValue"
               placeholder="keepValue"
               ref={register}
               style={{
                  display: true ? "block" : "none" // toggle the visbility of an input
               }}
            />

            {true && (
               <input
                  placeholder="ghost"
                  onChange={e => {
                     setValue("name", e.target.value, true); // thrid args trigger validation
                  }}
                  defaultValue={''}
               />
            )}

            <input type="submit" />
         </form>

         {/* working with a modal pop up */}
         {showModal && (
            <ModalForm mail={mail} setModalFormData={setModalFormData} />
         )}
      </>
   );
}

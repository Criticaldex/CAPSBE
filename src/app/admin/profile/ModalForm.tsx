'use any'
import * as React from "react";
import { useForm } from "react-hook-form";
import { UserIface } from "@/schemas/user";

type FormValues = { mail: string, name: string, lastname: string };

const ModalForm = ({
   mail,
   name,
   lastname,
   setModalFormData
}: {
   mail: string;
   name: string;
   lastname: string;
   setModalFormData: React.Dispatch<React.SetStateAction<string>>;
}) => {
   const { register, reset, handleSubmit } = useForm<FormValues>({
      defaultValues: {
         mail,
         name,
         lastname
      }
   });

   React.useEffect(() => {
      reset({
         mail,
         name,
         lastname
      });
   }, [reset, mail, name, lastname]);

   const onSubmit = (data: FormValues) => {
      setModalFormData(data.mail);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h2>Modal</h2>
         <input
            placeholder="mail"
            name="mail"
            ref={register('mail', { required: true }) as any}
         />
         <input type="submit" />
      </form>
   );
};

export { ModalForm };

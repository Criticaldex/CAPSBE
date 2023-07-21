"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";

export const RegisterForm = ({ session }: any) => {
   let [loading, setLoading] = useState(false);
   let [formValues, setFormValues] = useState({
      email: "",
      license: "123",
      db: session.user.db,
      server: session.user.server,
      password: "",
      name: "",
      lastname: "",
      role: "2"
   });

   const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
         const res = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(formValues),
            headers: {
               "Content-Type": "application/json",
            },
         });

         setLoading(false);
         if (!res.ok) {
            alert((await res.json()).message);
            return;
         }

         signIn(undefined, { callbackUrl: "/" });
      } catch (error: any) {
         setLoading(false);
         console.error(error);
         alert(error.message);
      }
   };

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
   };

   return (
      <form
         id="userForm"
         onSubmit={onSubmit}
         style={{
            display: "flex",
            flexDirection: "column",
            width: 500,
            rowGap: 10,
         }}
      >
         <label htmlFor="email">Email</label>
         <input
            required
            id="formEmail"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            style={{ padding: "1rem" }}
         />
         <label htmlFor="password">Contrasenya</label>
         <input
            required
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            style={{ padding: "1rem" }}
         />
         <label htmlFor="name">Nom</label>
         <input
            required
            id="formName"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            style={{ padding: "1rem" }}
         />
         <label htmlFor="lastname">Cognoms</label>
         <input
            required
            id="formLastname"
            type="text"
            name="lastname"
            value={formValues.lastname}
            onChange={handleChange}
            style={{ padding: "1rem" }}
         />
         <button
            style={{
               backgroundColor: `${loading ? 'var(--bg-dark)' : 'var(--darkBlue)'}`,
               color: "#fff",
               padding: "1rem",
               cursor: "pointer",
            }}
            disabled={loading}
         >
            {loading ? "loading..." : "Register"}
         </button>
      </form>
   );
};

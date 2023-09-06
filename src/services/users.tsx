import _ from "lodash"
import { getSession } from "@/services/session"
import userIface, { UserIface } from "@/schemas/user";
import { hash } from 'bcryptjs';

export const getUsers = async () => {
   return fetch(`http://localhost:${process.env.PORT}/api/users`,
      {
         method: 'GET'
      }).then(res => res.json());
}

export const getUser = async (email: string) => {
   return fetch(`http://localhost:${process.env.PORT}/api/users/${email}`,
      {
         method: 'GET'
      }).then(res => res.json());
}

export const getUsersbyDB = async () => {
   const session = await getSession();
   return fetch(`http://localhost:${process.env.PORT}/api/users?db=${session?.user.db}`,
      {
         method: 'GET'
      }).then(res => res.json());
}

export const upsertUser = async (data: UserIface) => {
   const saltRounds = 10;
   if (data.password) {
      data.hash = await hash(data.password, saltRounds);
   }

   return fetch(`http://localhost:${process.env.PORT}/api/users`,
      {
         method: 'PATCH',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(data),
      }).then(res => res.json());
}

export const deleteUser = async (email: string) => {
   return fetch(`http://localhost:${process.env.PORT}/api/users/${email}`,
      {
         method: 'DELETE',
         headers: {
            'Content-type': 'application/json',
         },
      }).then(res => res.json());
}
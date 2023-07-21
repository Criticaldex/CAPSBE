import _ from "lodash"
import { getSession } from "@/services/session"

export const getUsers = async () => {
   return fetch('http://localhost:3000/api/users',
      {
         method: 'GET'
      }).then(res => res.json());
}

export const getUsersbyDB = async () => {
   const session = await getSession();
   return fetch(`http://localhost:3000/api/users?db=${session?.user.db}`,
      {
         method: 'GET'
      }).then(res => res.json());
}
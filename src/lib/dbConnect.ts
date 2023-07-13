import { isUndefined } from 'lodash'
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_HOST as string


if (!MONGODB_URI) {
   throw new Error(
      'Please define the MONGO_HOST environment variable inside .env.local'
   )
}

let cached = global.mongoose

if (!cached) {
   cached = global.mongoose = { conn: null, promise: null }

}

async function dbConnect(db: any) {

   let opts: any = {
      dbName: db,
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS
   }

   if (cached?.conn?.connection?.$dbName == db) {
      return cached.conn
   } else if (db) {
      // Logic to check that the database is connected properly
      mongoose.connection.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
      mongoose.connection.once('open', () => {
         console.log('------------------- DATABASE CONNECTED:', db, '-------------------');
      });
      mongoose.connection.once('close', () => {
         console.log('------------------- DATABASE CONNECTION CLOSED -------------------');
      });
      opts.bufferCommands = false;
      opts.autoCreate = false;
      await mongoose.disconnect();
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
         return mongoose
      })
   }

   try {
      cached.conn = await cached.promise
   } catch (e) {
      cached.promise = null
      throw e
   }

   return cached.conn
}

export default dbConnect
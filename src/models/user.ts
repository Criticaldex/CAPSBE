import mongoose from 'mongoose'

export interface UserIface {
   name: String,
   lastname: String,
   username: String,
   hash: String
   license: {
      token: String,
      start: Date,
      end: Date,
   }
   server: String,
   db: String,
   role: String,
}

const Schema = new mongoose.Schema({});

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
   },
   lastname: {
      type: String,
   },
   username: {
      type: String,
      required: [true, 'Please provide a name for this pet.'],
      maxlength: [30, 'Name cannot be more than 60 characters'],
   },
   hash: {
      type: String
   },
   license: {
      token: {
         type: String,
      },
      start: {
         type: Date,
      },
      end: {
         type: Date,
      }
   },
   server: {
      type: String,
   },
   db: {
      type: String,
   },
   role: {
      type: String,
   },
});

export default mongoose.models.user || mongoose.model('user', UserSchema)
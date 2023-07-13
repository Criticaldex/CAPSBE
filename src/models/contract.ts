import mongoose from 'mongoose'

const Schema = new mongoose.Schema({});

export default mongoose.models.contract || mongoose.model('contract', Schema)
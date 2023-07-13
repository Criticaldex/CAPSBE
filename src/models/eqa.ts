import mongoose from 'mongoose'

const Schema = new mongoose.Schema({});

export default mongoose.models.eqa || mongoose.model('eqa', Schema)
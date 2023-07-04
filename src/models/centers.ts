import mongoose from 'mongoose'

const Schema = new mongoose.Schema({});

export default mongoose.models.center || mongoose.model('center', Schema)
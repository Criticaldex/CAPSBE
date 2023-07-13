import mongoose from 'mongoose'

const Schema = new mongoose.Schema({});

export default mongoose.models.professional || mongoose.model('professional', Schema)
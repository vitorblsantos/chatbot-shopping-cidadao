import { model, Schema } from 'mongoose'

const Logs = new Schema({
  name: String,
  description: String
}, {
  timestamps: true
})

export default model('Logs', Logs)

import { model, Schema } from 'mongoose'

const User = new Schema({
  name: String,
  session: String
}, {
  timestamps: true
})

export default model('user', User)

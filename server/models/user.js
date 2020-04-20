import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  verify: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('Users', UserSchema)

export default User;

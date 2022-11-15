import mongoose from 'mongoose'

/**
 * User details and user role name maps with the Role Schema with roleName
 */

const UserSchema = new mongoose.Schema({
  userName: String,
  userId:String,
  password:String,
  role:String,
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
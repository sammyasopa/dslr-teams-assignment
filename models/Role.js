import mongoose from 'mongoose'

/**
 * Role has a name and a priority. Role having higher priority can change
 * roles with lower priority if the contract allows. 
 */

const RoleSchema = new mongoose.Schema({
    roleName:String,
    rolePriority:Number
})

module.exports = mongoose.models.Role || mongoose.model('Role', RoleSchema)
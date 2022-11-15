import mongoose from 'mongoose'

/**
 * Contract maps the role to the list of operations that
 * the role can perform
 */

const ContractSchema = new mongoose.Schema({
    roleName:String,
    operations: [String]
})

module.exports = mongoose.models.Contract || mongoose.model('Contract', ContractSchema)
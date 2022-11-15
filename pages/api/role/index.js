// api/users.js

import dbConnect from '../../../lib/dbConnect'
import Role from '../../../models/Role'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()
  switch (method) {
    /**
     * Get all the roles
     */
    case 'GET':
      try {
        const role = await Role.find({})
        
        res.status(200).json({ success: true, data: role })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
      /**
       * Create new roles
       * 
       */
    case 'POST':
      try {
        // users.push(req.body);
        const role = await Role.create(req.body);
        res.status(201).json({ success: true, data: role })
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false,error:error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
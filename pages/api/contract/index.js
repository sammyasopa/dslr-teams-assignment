// api/users.js

import dbConnect from '../../../lib/dbConnect'
import Contract from '../../../models/Contract'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()
  switch (method) {
    /**
     * Get all the contracts from the db
     */
    case 'GET':
      try {
        const contract = await Contract.find({})
        
        res.status(200).json({ success: true, data: contract })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
      /**
       * Create a new contract after a new role has been added
       */
    case 'POST':
      try {
        // users.push(req.body);
        const contract = await Contract.create(req.body);
        res.status(201).json({ success: true, data: contract })
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
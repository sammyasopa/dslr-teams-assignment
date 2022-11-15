// api/users.js

import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import Contract from '../../../models/Contract'

export default async function handler (req, res) {
  const { method } = req

  await dbConnect()
  switch (method) {
    /**
     *  Get all the users if the currentUser role allows read operation in the contract;
     */
    case 'GET':
      try {
          const users = await User.find({})
          const user = users.filter(user => user.userId === req.query.userId);
          console.log(user);
          if(!req.query.userId || user.length==0){
            return res.status(500).json({
              success:false,
              error:"User doesn't exists"
            })
          }
          const contract = await Contract.findOne({roleName:user[0].role})
          console.log(contract);
          if(contract && contract.operations.includes("Read")){
            res.status(200).json({ success: true,
                data: users,
                deleteAllowed:contract.operations.includes("Delete")
              });
          }
          else{
            res.status(401).json({
              success:false,
              error:"User not permitted"
            })
          }
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false })
      }
      break
    /**
     * 
     * Create a new user if the currentUser's role allow create operation
     * in the contract.
     */
    case 'POST':
      try {
        const user = await User.findOne({userId:req.query.userId});
        const userExists = await User.findOne({userId:req.body.userId});
        console.log(userExists);
        console.log(user);
        const contract = await Contract.findOne({roleName:user.role});
        console.log(contract);
        if(contract && contract.operations.includes("Create") && !userExists){
          const newUser = await User.create(req.body);
          res.status(201).json({ success: true, data: newUser })
        }
        else{
          res.status(401).json({
            success:false,
            error:"User not authorized to access this feature"
          })
        }
        
      } catch (error) {
        console.log(error);
        res.status(500).json({ success: false,error:error })
      }
      break
      /**
       * Else give internal server error;
       * 
       */
    default:
      res.status(500).json({ success: false })
      break
  }
}


import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import Contract from '../../../models/Contract'


export default async function handler (req, res) {

    const { method } = req;
    const reqId = req.query.id;
    const userId = req.query.userId;
    await dbConnect()
    switch (method) {
      /**
       * 
       * GET the current user details by userID and also fetch all operations
       * allowed in the user role contract.
       */
        case 'GET':
          try {
            const user = await User.findOne({userId:reqId})
            if(!user){
              return res.status(401).json({success:false,error:"user not found"});
            }

            const contract = await Contract.findOne({roleName:user.role});
            
            const operations = contract?contract.operations:[];

            res.status(200).json({ success: true, data: user, operations:operations });
          } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error:error })
          }
          break
          /**
           * Delete a user with userId, check if the current user role allows 
           * delete operation if not then return 401 unauthorized
           */
        case 'DELETE':
          try {
            const user = await User.findOne({userId:userId});
            if(!user){
              return res.status(401).json({success:false,error:"User doesn't exists"});
            }
            const contract = await Contract.findOne({roleName:user.role});
            if(!contract || !contract.operations || !contract.operations.includes("Delete")){
              return res.status(401).json({success:false,error:"Delete operation doesn't exists"});
            }
            const result = await User.remove({userId:reqId, role:"Non-Admin"})
           
            res.status(201).json({ success: true, data: result })
          } catch (error) {
            console.log(error);
            res.status(500).json({ success: false,error:error })
          }
          break
        default:
          res.status(500).json({ success: false })
          break
      }

}
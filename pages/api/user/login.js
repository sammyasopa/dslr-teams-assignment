
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default async function handler (req, res) {

    const { method } = req;
    const reqId = req.query.id;
    await dbConnect()
    switch (method) {
        /**
         * This is used to login the user if the credentials are correct.
         * 
         */
        case 'POST':
          try{
            const user = await User.findOne({userId:req.body.userId,password:req.body.password});
            if(!user){
              res.status(401).json({success:false,message:"User not found"});
            }
            res.status(201).json({success:true,data:user});
          }
          catch(error){
            res.status(500).json({success:false, 
              message:"It's not you, it's us. We're working on it."
            });
          }
          break;
        default:
          res.status(500).json({ success: false })
          break
      }

}
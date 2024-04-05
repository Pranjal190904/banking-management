const userModel=require('../models/user.model');
const signAccessToken=require('../utils/token');

const user={
    login:async(req,res)=>{
        try{
            const {userName,password,mpin}=req.body;
            const User=await userModel.findOne({userName:userName});
            if(!User)
            {
                res.status(404).json({message:"user not found."});
                return;
            }
            if(password && password!=User.password)
            {
                res.status(401).json({message:"Incorrect password."})
                return;
            }
            if(mpin && mpin!=User.mpin)
            {
                res.status(401).json({message:"MPIN password."})
                return;
            }
            const accessToken=await signAccessToken(User.account);
            res.cookie("accessToken",accessToken,{httpOnly:true,sameSite:"None",secure:true});
            return res.status(200).json({message:"login successful."});
        }
        catch(err)
        {
            return res.status(500).json({message:"internal server error."});
        }
    }
}

module.exports=user;
const userModel=require('../models/user.model');
const accountModel=require('../models/account.model');
const signAccessToken=require('../utils/token');
const transactionModel=require('../models/transaction.model');

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
    },
    accountDetails:async(req,res)=>{
        try
        {
            const accountDetails=await accountModel.findOne({_id:req.user}).select('-_id');
            return res.status(200).json({accountDetails});
        }
        catch(err)
        {
            res.status(500).json({message:"internal server error."});
        }
    },
    transactions:async(req,res)=>{
        try{
            const transactions=await transactionModel.find({account:req.user}).sort({date:1}).select(['-_id','-account','-__v']);
            return res.status(200).json({transactions});
        }
        catch(err)
        {
            return res.status(500).json({message:"internal server error"});
        }
    }
    // createTransaction:async(req,res)=>{
    //         const {amount,accountNo,pin}=req.body;
    //         const user=await userModel.findOne({account:req.user}).populate("account");
    //         if(user.transactionPin!=pin)
    //         {
    //             return res.status(401).json({message:"incorrect pin."});
    //         }
    //         if(amount>user.account.balance)
    //         {
    //             return res.status(400).json({message:"insufficient balance"});
    //         }
    //         const receiver=await accountModel.findOne({accountNo:accountNo});  
    //         const newCredit=new transactionModel({
    //             amount:amount,
    //             type:"credit",
    //             account:receiver._id,
    //             name:user.account.name
    //         });
    //         await newCredit.save();
    //         const newDebit=new transactionModel({
    //             amount:amount,
    //             type:"debit",
    //             account:req.user,
    //             name:receiver.name
    //         });
    //         await newDebit.save();
    //         const x=await accountModel.findOneAndUpdate({accountNo:user.account.accountNo},{$inc:{balance:-amount}});
    //         console.log(x);
    //         const y=await accountModel.findOneAndUpdate({accountNo:accountNo},{$inc:{balance:amount}});
    //         console.log(y);
    //         return res.status(200).json({message:"transaction successful."});
    // }
}

module.exports=user;
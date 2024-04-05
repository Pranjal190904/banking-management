const mongoose=require('mongoose')

const accountSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true
    },
    accountNo:{
        type:Number,
        require:true,
        unique:true
    },
    amount:{
        type:mongoose.Schema.Types.Decimal128,
        require:true,
        default:0.00
    },
    mobileNumber:{
        type:Number,
        require:true
    },
    aadharNumber:{
        type:Number
    },
    panNumber:{
        type:String
    }
})

module.exports=mongoose.Schema("Account",accountSchema);
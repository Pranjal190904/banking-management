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
    balance:{
        type:Number,
        default:0
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

accountSchema.set('setDefaultsOnInsert', true);

module.exports=mongoose.model("Account",accountSchema);
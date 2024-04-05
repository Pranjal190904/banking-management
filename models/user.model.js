const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    userName:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    mpin:{
        type:Number
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account"
    }
})

module.exports=mongoose.model("User",userSchema);
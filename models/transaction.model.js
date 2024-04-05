const mongoose=require('mongoose');

const transactionSchema=new mongoose.Schema({
    amount:{
        type:Number,
        require:true
    },
    type:{
        type:String,
        enum:['credit','debit'],
        require:true
    },
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account"
    },
    name:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

transactionSchema.set('setDefaultsOnInsert', true);

module.exports=mongoose.model("Transaction",transactionSchema);
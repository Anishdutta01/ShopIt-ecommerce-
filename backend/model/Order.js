const mongooose=require("mongoose");

const orderSchema=new mongooose.Schema({
    user:{type:mongooose.Schema.Types.ObjectId,ref:"User",required:true},
    items:[
        {
            productId:{type:mongooose.Schema.Types.ObjectId,ref:"Product",required:true},
            quantity:{type:Number,required:true},
            price:{type:Number,required:true}
        }
    ],
    totalAmount:{type:Number,required:true},
    address:{
        fullname:{type:String,required:true},
        street:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true}
    },
    paymentId:{type:String},
    status:{type:String,enum:["pending","shipped","delivered"],default:"pending"},

},{timestamps:true});
module.exports=mongooose.model("Order",orderSchema);
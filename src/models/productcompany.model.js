const mongoose = require("mongoose");
const productcompany_schema = new mongoose.Schema({
    ProductCode:{
        type:String,
        minLength:1,
        maxLength:10
    },
    ProductName:{
        type:String,
        minLength:1,
        maxLength:225
    },
    ProductData:{
        type:Date,
    },
    ProductOriginPrice:{
        type:Number,
        min:0,
        required:true
    },
    Quantity:{
        type:Number
    },
    ProductStoreCode:{
        type:String
    }
});
module.exports = mongoose.model("Productcompany",productcompany_schema);
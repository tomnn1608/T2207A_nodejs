const mongoose = require("mongoose");
const category_schema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    },
    products: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});
module.exports = mongoose.model("Category",category_schema);
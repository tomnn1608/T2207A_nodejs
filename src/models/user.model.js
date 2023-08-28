const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
    // _id
    fullname: {
        type:String,
        required:[true,'Trường này bắt buộc phải nhập'],
        minLength:[10,"Độ dài tối thiểu 10"]
    },
    email:{
        type:String,
        required:true,
        minLength:10,
        unique:true,
        validate: {
            validator: (v)=>{
                const re =
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    return v.match(re);
            },
            message: (t)=>`${t.value} không phải định dạng email`
        }
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        required:true,
        validate: {
            validator: (v)=>{
                if(v== "admin" || v== "user")
                    return true;
                return false;
            },
            message: t => `Role người dùng khôngg hợp lệ`
        }
    }
});
module.exports = mongoose.model("User",user_schema);
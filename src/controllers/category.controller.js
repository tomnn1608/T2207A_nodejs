const Category = require("./../models/category.model");
const fs = require("fs");

exports.listcategory = async(req,res)=>{
    try{
        const rs = await Category.find();
        res.render("category/listcategory",{category:rs});
    }catch(error){
        
    }
}

exports.formCreate = (req,res)=>{
    const data = req.body;
    // console.log(req._parsedOriginalUrl.path)
    data.url = req._parsedOriginalUrl.path;
    res.render("category/formcategory",{category:data});
}

exports.store = async (req,res)=>{
    const data = req.body;
    const file = req.file;
    // console.log(file);
    if(file){
        const img = fs.readFileSync(file.path);
        data.thumbnail = {
            contentType: file.mimetype,
            data:img.toString("base64")
        }
    }
    try {
        // data.thumbnail = `/uploads/${file.filename}`;
        const p = new Category(data);
        await p.save();
        res.redirect("/category");
    } catch (error) {
        res.render("category/formcategory",{category:data,error:error});
    }
}

exports.formEdit = async (req,res)=>{
    const _id = req.params.id;
    try {
        const category = await Category.findById(_id);
        Category.url = req._parsedOriginalUrl.path;
        res.render("category/formcategory",{category:category});
    } catch (error) {
        res.redirect("/category");
    }
}

exports.update = async (req,res)=>{
    const _id = req.params.id;
    const data = res.body;
    const category = await Category.findById(_id);
    try{
        const file = req.file;
        if(file){
            const img = fs.readFileSync(file.path);
            data.thumbnail ={
                contentType: file.mimetype,
                data:img.toString("base64")
            }
        }else{
            data.thumbnail = category.thumbnail;
        }
        await Category.findByIdAndUpdate(_id,data);
        res.redirect("/category");
    }catch(error){
        res.render("category/formcategory",{category:category});
    }
}

exports.delete = async (req,res)=>{
    const _id = req.params.id;
    try{
        await Category.findByIdAndDelete(_id);
        res.redirect("/category");
    }catch(error){
        res.redirect("/category");
    }
}

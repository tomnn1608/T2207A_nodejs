const Brand = require("./../models/brand.model");
const fs = require("fs");

exports.listbrand = async(req,res)=>{
    try{
        const rs = await Brand.find();
        res.render("brand/listbrand",{brands:rs});
    }catch(error){
        
    }
}

exports.formCreate = (req,res)=>{
    const data = req.body;
    // console.log(req._parsedOriginalUrl.path)
    data.url = req._parsedOriginalUrl.path;
    res.render("brand/formbrand",{brand:data});
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
        const p = new Brand(data);
        await p.save();
        res.redirect("/brand");
    } catch (error) {
        res.render("brand/formbrand",{brand:data,error:error});
    }
}

exports.formEdit = async (req,res)=>{
    const _id = req.params.id;
    try {
        const brand = await Brand.findById(_id);
        brand.url = req._parsedOriginalUrl.path;
        res.render("brand/formbrand",{brand:brand});
    } catch (error) {
        res.redirect("/brand");
    }
}

exports.update = async (req,res)=>{
    const _id = req.params.id;
    const data = res.body;
    const brand = await Brand.findById(_id);
    try{
        const file = req.file;
        if(file){
            const img = fs.readFileSync(file.path);
            data.thumbnail ={
                contentType: file.mimetype,
                data:img.toString("base64")
            }
        }else{
            data.thumbnail = brand.thumbnail;
        }
        await Brand.findByIdAndUpdate(_id,data);
        res.redirect("/brand");
    }catch(error){
        res.render("brand/formbrand",{brand:brand});
    }
}

exports.delete = async (req,res)=>{
    const _id = req.params.id;
    try{
        await Brand.findByIdAndDelete(_id);
        res.redirect("/brand");
    }catch(error){
        res.redirect("/brand");
    }
}

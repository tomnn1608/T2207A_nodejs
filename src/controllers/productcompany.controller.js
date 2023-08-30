const productcompany = require("./../models/productcompany.model");
const fs = require("fs");

exports.listproductcompany = async(req,res)=>{
    try{
        const rs = await productcompany.find().sort({ ProductStoreCode: -1});
        res.render("productcompany/listproductcompany",{productcompanys:rs});
    }catch(error){
        res.send(error);
    }
}
exports.formCreate = (req,res)=>{
    const data = req.body;
    // console.log(req._parsedOriginalUrl.path)
    data.url = req._parsedOriginalUrl.path;
    res.render("productcompany/formproductcompany",{productcompany:data});
}
exports.store = async (req,res)=>{
    const data = req.body;
    try {
        const p = new productcompany(data);
        await p.save();
        res.redirect("/productcompany");
    } catch (error) {
        res.render("productcompany/formproductcompany",{productcompany:data,error:error});
    }
}

exports.delete = async (req,res)=>{
    const _id = req.params.id;
    try{
        await productcompany.findByIdAndDelete(_id);
        res.redirect("/productcompany");
    }catch(error){
        res.redirect("/productcompany");
    }
}

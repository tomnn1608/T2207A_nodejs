const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port,function(){ // callback function
    console.log("Server is running...");
})
require("./src/db/database");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const webrouter = require("./src/routes/web");
app.use("/",webrouter); 
const userrouter = require("./src/routes/user");
app.use("/auth",userrouter);
const productrouter = require("./src/routes/product.routes");
app.use("/product",productrouter);
const brandrouter = require("./src/routes/brand.routes");
app.use("/brand",brandrouter);
const categoryrouter = require("./src/routes/category.routes");
app.use("/category",categoryrouter);
const productcompanyrouter = require("./src/routes/productcompany.routes");
app.use("/productcompany",productcompanyrouter);
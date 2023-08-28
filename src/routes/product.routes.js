const express = require("express");
const router = express.Router();
const controller = require("./../controllers/product.controller");
// ai cung vao dc trang danh sach- xem
// them moi - update - xoa thi chi admin
const middleware = require("./../middlewares/role.middleware");
router.use("/create",middleware.role_admin);
router.use("/edit/:id",middleware.role_admin);
router.use("/delete",middleware.role_admin);


// upload file
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        if(file)
            callback(null,"public/uploads");
    },
    filename: (req,file,callback)=>{
        if(file)
            callback(null,Date.now()+"-"+file.originalname);
    }
});
const upload = multer({storage:storage});

router.get("/",controller.list);
router.get("/create",controller.formCreate);
router.post("/create",upload.single("thumbnail"),controller.store);
router.get("/edit/:id",controller.formEdit);
router.post("/edit/:id",upload.single("thumbnail"),controller.update);
router.get("/delete/:id",controller.delete);

module.exports = router;
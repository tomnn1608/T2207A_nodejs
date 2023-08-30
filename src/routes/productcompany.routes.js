const express= require("express");
const router = express.Router();
const controller = require("./../controllers/productcompany.controller");

router.get("/",controller.listproductcompany);
router.get("/create",controller.formCreate);
router.post("/create",controller.store);
router.get("/delete/:id",controller.delete);

module.exports = router;
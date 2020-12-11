/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

var express = require("express");
var ProductController = require("../controller/products");
var md_auth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/product", md_auth.ensureAuth, ProductController.saveProduct);
api.get("/products", md_auth.ensureAuth, ProductController.getProducts);
api.get("/product/:id", md_auth.ensureAuth, ProductController.getProduct);
api.delete("/product/:id", md_auth.ensureAuth, ProductController.deleteProduct);
api.put("/product/:id", md_auth.ensureAuth, ProductController.putProduct);
api.get("/product/user/:id", md_auth.ensureAuth, ProductController.getProductByUser);

module.exports = api;
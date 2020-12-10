/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

var express = require("express");
const app = require("../app");
var ProductController = require("../controller/products");
var md_auth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/product", md_auth.ensureAuth, ProductController.saveProduct);
api.get("/products", md_auth.ensureAuth, ProductController.getProducts);
api.get("/product/:id", md_auth.ensureAuth, ProductController.getProduct);
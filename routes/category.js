/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

var express = require("express");
const app = require("../app");
var CategoryController = require("../controller/category");
var md_auth = require("../middlewares/authenticated");

var api = express.Router();

api.post("/category", md_auth.ensureAuth, CategoryController.saveCategory);
api.get("/categorys", md_auth.ensureAuth, CategoryController.getCategorys);
api.delete("/category/:id", md_auth.ensureAuth, CategoryController.deleteCategory);
api.put("/category/:id", md_auth.ensureAuth, CategoryController.putCategory);
/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
 */

"use strict"

var express = require("express");
const app = require("../app");
var UserController = require("../controller/user");
var md_auth = require("../middlewares/authenticated")

var api = express.Router();

api.post("/user", UserController.saveUser);
api.get("/users", md_auth.ensureAuth, UserController.getUsers);
api.post("/login", UserController.loginUser);
api.delete("/user/:id", md_auth.ensureAuth, UserController.deleteUser);
api.get("/user/:id", md_auth.ensureAuth, UserController.getUser);

module.exports = api;
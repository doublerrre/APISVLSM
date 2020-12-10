/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
 */

"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    nombre: String,
    existencias: String, 
    precio: String,
    updated: {type: Date, default: Date.now},
    user: {type: Schema.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Products", ProductSchema);
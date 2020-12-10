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
    user: {type: Schema.ObjectId, ref: "User"},
    category: {type: Schema.ObjectId, ref: "Category"},
    updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Products", ProductSchema);
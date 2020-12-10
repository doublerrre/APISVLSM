/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema = Schema({
    nombre: String,
    updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Category", CategorySchema);
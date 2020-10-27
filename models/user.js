/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
 */

var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    ap_pat: String,
    ap_mat: String,
    email: {type: String, unique:true, index:true, required:true}, 
    username: {type: String, unique:true, index:true, required:true}, 
    password: String,
    direccion: String,
    telefono: String,
    role: String,
    image: String,
});

module.exports = mongoose.model("User", UserSchema);
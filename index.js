/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
 */

"use strict"

const mongoose = require("mongoose");
var app = require("./app");
var port = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost/svlsm", {useNewUrlParser:true, useUnifiedTopology: true}, function(err, db){
    if(err){
        throw err;
    }else{
        console.log("Conectado a la base de datos");
        app.listen(port, function(){
            console.log("Servidor Express funcionando en http://localhost:" + port);
        })
    }
});
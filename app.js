/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
 */

"use strict"
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cargar rutas
var user_routes = require("./routes/user");

//Definir una ruta base
app.use("/api", user_routes);

//Ruta Home
app.get("/", function(req, res){
    res.status(200).send({
        message: "Bienvenido a la Api Rest de Area Code F2"
    });
});

module.exports = app;
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

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Cargar rutas
var user_routes = require("./routes/user");
var product_routes = require("./routes/product");
var category_routes = require("./routes/category");

//Definir una ruta base
app.use("/api", user_routes);
app.use("/api", product_routes);
app.use("/api", category_routes);

//Ruta Home
app.get("/", function(req, res){
    res.status(200).send({
        message: "Bienvenido a la Api Rest de Area Code F2"
    });
});

module.exports = app;
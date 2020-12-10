/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

var Product = require("../models/products");
const user = require("../models/user");

function saveProduct(req, res){
    var params = req.body;
    var product = new Product();

    product.nombre = params.nombre;
    product.existencias = params.existencias;
    product.precio = params.precio;
    product.user = params.user;
    product.category = params.category;

    if(product.nombre != null && product.existencias != null && product.precio != null && product.user != null && product.category != null){
        user.save((err, data) => {
            if(err){
                res.status(500).send({
                    code: 500,
                    message: "Error interno en el servidor, favor de intentarlo mas tarde."
                });
            }else{
                if(!data){
                    res.status(500).send({
                        code: 500,
                        message: "Error al intentar guardar el producto, favor de intentarlo mas tarde."
                    });
                }else{
                    res.status(201).send({
                        code: 201,
                        message: "Producto guardado con exito.",
                        data: data
                    });
                }
            }
        });
    }else{
        res.status(400).send({
            code: 400,
            message: "Todos los campos son requeridos."
        });
    }
}

module.exports = {
    saveProduct,
}
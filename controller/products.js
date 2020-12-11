/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

var Product = require("../models/products");

function saveProduct(req, res){
    var params = req.body;
    var product = new Product();

    product.nombre = params.nombre;
    product.existencias = params.existencias;
    product.precio = params.precio;
    product.user = req.user.sub;
    product.category = params.category;

    if(product.nombre != null && product.existencias != null && product.precio != null && product.user != null && product.category != null){
        product.save((err, data) => {
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

function getProducts(req, res){
    Product.find({}).populate("user").populate("category").exec(function(err, result){
        if(err){
            res.status(500).send({
				code: 500,
                message: "Error en el servidor, favor de intentarlo mas tarde."
            });
        }else{
            if(result == "{}"){
                res.status(404).send({
					code: 404,
					message: "No se encontraron datos en el servidor."
				});
            }else{
                res.status(200).send({
					code: 200,
					message: "Busqueda exitosa.",
					data: result
				});
            }
        }
    });
}

function getProduct(req, res){
    var productId = req.params.id;
    Product.findById(productId).populate("user").populate("category").exec((err, userFound) => {
        if (err) {
            return res.status(500).send({
                code: 500,
                message: 'No se encontró el producto',
            });
        } else {
            if (!userFound) {
                return res.status(500).send({
                    code: 500,
                    message: 'Hubo un error al buscar el producto',
                });
            } else {
                return res.status(200).send({
                    code: 200,
                    message: 'consulta exitosa',
                    data: userFound,
                });
            }
        }
    });
}

function deleteProduct(req, res){
    var productId = req.params.id;
    Product.findByIdAndDelete(productId, (err, result) => {
        if(err){
            res.status(500).send({
				code: 500,
				message: 'Error en el servidor, favor de intentarlo mas tarde.',
			});
        }else{
            if(!result){
                res.status(404).send({
					code: 404, 
					message: "Este id no se encuentra en la base de datos."
				});
            }else{
                res.status(200).send({
					code: 200, 
					message: "Producto eliminado correctamente.",
					data: result
				});
            }
        }
    });
}

function putProduct(req, res){
    var productId = req.params.id;
    var update = req.body;

    Product.findByIdAndUpdate(productId, update, (err, result) => {
        if(err){
            res.status(500).send({
				code: 500,
				message: "Error en el servidor, vuelva a intentarlo mas tarde."
			});
        }else{
            if(!result){
                res.status(404).send({
					code: 404,
					message: "No se encuentra el producto en la base de datos."
				});
            }else{
                res.status(200).send({
					code: 200,
					message: "Producto actualizado correctamente.",
					data: result,
				});
            }
        }
    });
}

function getProductByUser(req, res){
    Product.find({user: {$eq: req.params.id}}).exec((err, data) => {
        if (err) {
            return res.status(500).send({
                code: 500,
                message: 'No se encontró el producto',
            });
        } else {
            if (!data) {
                return res.status(500).send({
                    code: 500,
                    message: 'Hubo un error al buscar el producto',
                });
            } else {
                return res.status(200).send({
                    code: 200,
                    message: 'consulta exitosa',
                    data: data,
                });
            }
        }
    });
}
 
module.exports = {
    saveProduct,
    getProducts,
    getProduct,
    deleteProduct,
    putProduct,
    getProductByUser,
}
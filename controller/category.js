/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

var Category = require("../models/category");

function saveCategory(req, res){
    var params = req.body;
    var category = new Category();

    category.nombre = params.nombre;

    if(category.nombre != null){
        category.save((err, data) => {
            if(err){
                res.status(500).send({
                    code: 500,
                    message: "Error interno en el servidor, favor de intentarlo mas tarde."
                });
            }else{
                if(!data){
                    res.status(500).send({
                        code: 500,
                        message: "Error al intentar guardar la categoria, favor de intentarlo mas tarde."
                    });
                }else{
                    res.status(201).send({
                        code: 201,
                        message: "Guardado exitoso.",
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

function getCategorys(req, res){
    Category.find({}).exec(function(err, result){
        if(err){
            res.status(500).send({
				code: 500,
                message: "Error en el servidor, favor de intentarlo mas tarde."
            });
        }else{
            if(!result){
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

module.exports = {
    saveCategory,
}
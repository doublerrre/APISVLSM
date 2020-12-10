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

function deleteCategory(req, res){
    var categoryId = req.params.id;
    Category.findByIdAndDelete(categoryId, (err, result) => {
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
					message: "Categoria eliminada correctamente.",
					data: result
				});
            }
        }
    });
}

function putCategory(req, res){
    var categoryId = req.params.id;
    var update = req.body;

    Category.findByIdAndUpdate(categoryId, update, (err, result) => {
        if(err){
            res.status(500).send({
				code: 500,
				message: "Error en el servidor, vuelva a intentarlo mas tarde."
			});
        }else{
            if(!result){
                res.status(404).send({
					code: 404,
					message: "No se encuentra el usuario en la base de datos."
				});
            }else{
                res.status(200).send({
					code: 200,
					message: "Usuario actualizado correctamente.",
					data: result,
				});
            }
        }
    });
}

module.exports = {
    saveCategory,
    getCategorys,
    deleteCategory,
    putCategory,
}
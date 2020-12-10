/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

'use strict'

var User = require("../models/user");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt")


/*
╔═════════════════════════════╗ 
║ Funcion de guardar usuarios ║ 
╚═════════════════════════════╝ 
*/

function saveUser(req, res){
    var params = req.body;
    var user = new User();

    user.nombre = params.nombre;
    user.ap_pat = params.ap_pat;
    user.ap_mat = params.ap_mat;
    user.email = params.email;
    user.username = params.username;
    user.direccion = params.direccion;
    user.telefono = params.telefono;
    user.role = 'ROLE_USER';
	user.image = "null";

    if(params.password){
        bcrypt.hash(params.password, null, null, function(err, hash){
			user.password = hash;
			if(user.nombre != null && user.email != null && user.username !=null){
				user.save((err, data) =>{
					if(err){
						if(err.code == 11000){
							res.status(500).send({
								code: 500,
								message: "Error el correo o el usuario ya esta registrado en la base de datos."
							});
						}else{
							res.status(500).send({
								code: 500,
								message: "Error interno en el servidor, favor de intentarlo mas tarde."
							});
						}
					}else{
						if(!data){
							res.status(500).send({
								code: 500,
								message: "Error al intentar guardar el usuario, favor de intentarlo mas tarde."
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
        });
    }

}

function getUsers(req, res){
	User.find({}).exec(function(err, result){
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

function loginUser(req, res){
	var params = req.body;

	var username = params.username;
	var password = params.password;
	User.findOne({username: username}, (err, user)=>{
		if(err){
			res.status(500).send({
				code: 500,
				message: "Error en el servidor, favor de intentarlo mas tarde",
			});
		}else{
			if(!user){
				res.status(404).send({
					code: 404,
					message: "Error, el usuario no existe.",
				});
			}else{
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						res.status(200).send({
							code: 200,
							message: "Login correcto",
							token: jwt.CreateToken(user),
						});
					}else{
						res.status(403).send({
							code: 403,
							message: "Login incorrecto",
						});
					}
				});
			}
		}
	});
}

function getUser(req, res){
	var userId = req.params.id;
	User.findById(userId, (err, result) => {
		if(err){
			res.status(500).send({
				code: 500,
				message: "Error en el servidor, vuelva a intentarlo mas tarde."
			});
		}else{
			if(!result){
				res.status(404).send({
					code: 404,
					message: "No existe el usuario en la base de datos."
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

function deleteUser(req, res){
	var UserId = req.params.id;
	User.findByIdAndDelete(UserId, (err, result) => {
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
					message: "Usuario eliminado correctamente.",
					data: result
				});
			}
		}
	});
}

function putUser(req, res){
	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId, update, (err, result) => {
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
	saveUser,
	getUsers,
	loginUser,
	deleteUser,
	getUser,
	putUser,
}
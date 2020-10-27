/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
 */

"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "84fdb78f421faebf3cbef2cfede04dfb5183e32641439e835a4408e0224a55d0"

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({
            code: 403,
            message: "No tienes acceso, contacta a un administrador.",
        });
    }
    var token = req.headers.authorization.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            res.status(403).send({
                code: 403,
                message: "El token expiro"
            });
        }
    }catch(ex){
        console.log(ex)
        return res.status(404).send({
            code: 404,
            message: 'El token no es valido'
        });
    }
    req.user = payload;
    next();
}
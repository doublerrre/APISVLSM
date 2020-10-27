/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
 */

const { use } = require("../app");

"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "84fdb78f421faebf3cbef2cfede04dfb5183e32641439e835a4408e0224a55d0"

exports.CreateToken = function(user){
    var payload = {
        sub: user._id,
        username: user.username,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }
    return jwt.encode(payload, secret); 
}
/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

if(!localStorage.getItem("TOKEN_SVLSM")){
    logout();
}

function logout(){
    localStorage.removeItem("TOKEN_SVLSM");
    window.location.replace("login.html");
}
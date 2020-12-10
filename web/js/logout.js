/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

function logout(){
    localStorage.removeItem("TOKEN_SVLSM");
    window.location.replace("login.html");
}
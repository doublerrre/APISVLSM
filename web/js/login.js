/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

'use strict'

$(function(){
    console.log("jQuery is working...");
    var url = "http://localhost:8000/api/";
    //Eventos
    $(document).on("click", "#login_session", function(e){
        e.preventDefault();
        const postData = {
            username: $("#username").val(),
            password: $("#password").val()
        }
        login(postData);
    });
    //Funciones
    function login(postData){
        $.ajax({
            url: url + "login",
            type: "POST",
            data: postData,
            dataType: "JSON",
            success: function(response){
                alert(response.message);
            },
            error: function(response){
                console.log(response);
            }
        });
    }
});
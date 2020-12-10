/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

'use strict'

if(localStorage.getItem("TOKEN_SVLSM")){
    window.location.replace("index.html");
}

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

    $(document).on("click", "#save_User", function(e){
        e.preventDefault();
        const postData = {
            nombre: $("#nombre").val(),
            ap_pat: $("#ap_pat").val(),
            ap_mat: $("#ap_mat").val(),
            email: $("#email").val(),
            username: $("#username").val(),
            direccion: $("#direccion").val(),
            telefono: $("#telefono").val(),
            password: $("#password").val(),
        }
        saveUser(postData);
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
                localStorage.setItem("TOKEN_SVLSM", response.token);
                window.location.replace("index.html");
            },
            error: function(response){
                alert(response.responseJSON.message);
            }
        });
    }

    function saveUser(postData){
        $.ajax({
            url: url + "user",
            type: "POST",
            data: postData,
            dataType: "JSON",
            success: function(response){
                alert(response.message);
                window.location.replace("login.html");
            },
            error: function(response){
                alert(response.responseJSON.message);
            }
        });
    }
});
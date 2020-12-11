/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

$(function(){
	var token = localStorage.getItem("TOKEN_SVLSM");
	tabla();
	var table;
	var url = "http://localhost:8000/api/";
	
	//Eventos
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
	function tabla(){
        table = $("#dataTable").DataTable({
			"ajax": {
				"method": "GET",
				"dataType": "JSON",
				"url": "http://localhost:8000/api/users",
				"headers":{
					"Authorization" : token,
				},
			},
			"columns": [
				{"data":"nombre"},
				{"data":"ap_pat"},
				{"data":"ap_mat"},
				{"data":"email"},
				{"data":"username"},
				{"data":"direccion"},
				{"data":"telefono"},
				{"defaultContent":"<button data-bs-toggle='modal' data-bs-target=#modal_editar_usuario' type='button' class='getUser btn btn-success'><i class='fas fa-user-edit'></i></button><button type='button' class='deleteUser btn btn-danger'><i class='fas fa-ban'></i></button>"}
			],
			"iDisplayLength": 5,
		});
	}

	deleteUser("#dataTable", table);
	getData("#dataTable", table);

	function cleanInputs(){
		//Save inputs
		$("#nombre").val("");
		$("#ap_pat").val("");
		$("#ap_mat").val("");
		$("#email").val("");
		$("#username").val("");
		$("#direccion").val("");
		$("#telefono").val("");
		$("#password").val("");

		//Edit Inputs
	}

	function getData(tbody, table){
		$(tbody).on("click", ".getUser", function(){
			var data = table.row($(this).parents("tr")).data();
			
		});
	}

	function deleteUser(tbody, table){
		$(tbody).on("click", ".deleteUser", function(){
			var data = table.row($(this).parents("tr")).data();
			var id = data._id;
			$.ajax({
				method: "DELETE",
				dataType: "JSON",
				url: url + "user/" + id,
				headers: {
					Authorization: token,
				},
				success: function(response){
					alert(response.message);
					table.destroy();
					tabla();
				},
				error: function(response){
					alert(response.ResponseJSON.message);
				}
			});
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
				$("#modal_crear_usuario").modal('hide');
                table.destroy();
				tabla();
				cleanInputs();
            },
            error: function(response){
                alert(response.responseJSON.message);
            }
        });
    }
});
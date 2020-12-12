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
	
	$(document).on("click", "#editUser", function(e){
		e.preventDefault();
		var _id = $("#_id").val();
		const putData = {
			nombre: $("#editnombre").val(),
			ap_pat: $("#editap_pat").val(),
			ap_mat: $("#editap_mat").val(),
			email: $("#editemail").val(),
			username: $("#editusername").val(),
			direccion: $("#editdireccion").val(),
			telefono: $("#edittelefono").val(),
		}
		putUser(_id, putData);
	})
	
    //Funciones
	function tabla(){
        table = $("#dataTable").DataTable({
			"language": {
				"url": "http://cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json",
			},
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
				{"defaultContent":"<button type='button' class='getUser btn btn-success'><i class='fas fa-user-edit'></i></button><button type='button' class='deleteUser btn btn-danger'><i class='fas fa-ban'></i></button>"}
			],
			"iDisplayLength": 5,
		});
	}

	deleteUser("#dataTable", table);
	getData("#dataTable", table);

	function getData(tbody, table){
		$(tbody).on("click", ".getUser", function(){
			var data = table.row($(this).parents("tr")).data();
			$("#_id").val(data._id);
			$("#editnombre").val(data.nombre);
			$("#editap_pat").val(data.ap_pat);
			$("#editap_mat").val(data.ap_mat);
			$("#editemail").val(data.email);
			$("#editusername").val(data.username);
			$("#editdireccion").val(data.direccion);
			$("#edittelefono").val(data.telefono);
			$("#modal_editar_usuario").modal("show");
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
					location.reload();
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
            method: "POST",
            data: postData,
            dataType: "JSON",
            success: function(response){
				alert(response.message);
				$("#modal_crear_usuario").modal('hide');
                location.reload();
            },
            error: function(response){
                alert(response.responseJSON.message);
            }
        });
	}
	
	function putUser(_id, putData){
		$.ajax({
			method: "PUT",
			dataType: "JSON",
			url: url + "user/" + _id,
			data: putData,
			headers: {
				Authorization: token,
			},
			success: function(response){
				alert(response.message);
				$("#modal_editar_usuario").modal('hide');
                location.reload();
			},
			error: function(response){
				alert(response.responseJSON.message);
			}
		});
	}
});
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
    $(document).on("click", "#saveCategory", function(e){
        e.preventDefault();
        var nombre = $("#nombre").val();
        saveCategory(nombre);
    });

    $(document).on("click", "#editCategory", function(e){
        e.preventDefault();
        var _id = $("#_id").val();
        var nombre = $("#editnombre").val();

        putCategory(_id, nombre);
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
				"url": "http://localhost:8000/api/categorys",
				"headers":{
					"Authorization" : token,
				},
			},
			"columns": [
				{"data":"nombre"},
				{"defaultContent":"<button type='button' class='getCategory btn btn-success'><i class='fas fa-user-edit'></i></button><button type='button' class='deleteCategory btn btn-danger'><i class='fas fa-ban'></i></button>"}
			],
			"iDisplayLength": 5,
		});
    }

    getData("#dataTable", table);
    deleteCategory("#dataTable", table);

    function getData(tbody, table){
        $(tbody).on("click", ".getCategory", function(){
			var data = table.row($(this).parents("tr")).data();
			$("#_id").val(data._id);
            $("#editnombre").val(data.nombre);
            $("#modal_editar_categoria").modal("show");
		});
    }

    function saveCategory(nombre){
        $.ajax({
            url: url + "category",
            method: "POST",
            data: {nombre: nombre},
            dataType: "JSON",
            headers: {
                Authorization: token,
            },
            success: function(response){
                alert(response.message);
                $("#modal_crear_categoria").modal('hide');
                $("#nombre").val("");
                table.destroy();
				tabla();
            },
            error: function(err){
                alert(err.responseJSON.message);
            }
        });
    }

    function putCategory(_id, nombre){
        $.ajax({
            method: "PUT",
            dataType: "JSON",
            url: url + "category/" + _id,
            data: {nombre: nombre},
            headers: {
				Authorization: token,
            },
            success: function(response){
                alert(response.message);
                $("#modal_editar_categoria").modal('hide');
                table.destroy();
				tabla();
            },
            error: function(err){
                alert(err.responseJSON.message);
            }
        });
    }

    function deleteCategory(tbody, table){
        $(tbody).on("click", ".deleteCategory", function(){
            var data = table.row($(this).parents("tr")).data();
            var id = data._id;
            $.ajax({
                method: "DELETE",
                url: url + "category/" + id,
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
    

});
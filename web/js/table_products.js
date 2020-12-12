/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

$(function(){
    $(document).ready(function() {
        $('.js-example-basic-single').select2({width: 450});
    });

    var token = localStorage.getItem("TOKEN_SVLSM");
    var url = "http://localhost:8000/api/";
    tabla();
    getCategorys();
    var table;
    //Eventos
    $(document).on("click", "#save_Product", function(e){
        e.preventDefault();
        const postData = {
            nombre: $("#nombre").val(),
            existencias: $("#stock").val(), 
            precio: $("#precio").val(),
            category: $("#option_value").val(),
        }
        saveProducts(postData);
    });

    $(document).on("click", "#edit_Product", function(e){
        e.preventDefault();
        var id = $("#_id").val();
        const putData = {
            nombre: $("#editnombre").val(),
            existencias: $("#editstock").val(),
            precio: $("#editprecio").val(),
        }
        putProduct(id, putData);
    })

    //Funciones
    function getCategorys(){
        $.ajax({
            method: "GET",
            url: url + "categorys",
            headers: {
                Authorization: token,
            },
            success: function(response){
                let categorias = JSON.parse(JSON.stringify(response.data));
                let plantilla = "";

                categorias.forEach(categoria => {
                    plantilla += `
                    <option value="${categoria._id}">${categoria.nombre}</option>
                    `;
                });
                $("#option_value").html(plantilla);
            },
            error: function(response){
                alert(response.ResponseJSON.message);
            }
        });
    }

    function tabla(){
        table = $("#dataTable").DataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json",
            },
            "ajax": {
                "method": "GET",
                "dataType": "JSON",
                "url": "http://localhost:8000/api/userproduct/",
                "headers":{
                    "Authorization" : token,
                },
            },
            "columns": [
                {"data":"nombre"},
                {"data":"existencias"},
                {"data":"precio"},
                {"data":"updated"},
                {"defaultContent":"<button type='button' class='getProduct btn btn-success'><i class='fas fa-user-edit'></i></button><button type='button' class='deleteProduct btn btn-danger'><i class='fas fa-ban'></i></button>"}
            ],
            "iDisplayLength": 5,
        });
    }

    getData("#dataTable", table);
    deleteProducts("#dataTable", table);

    function getData(tbody, table){
		$(tbody).on("click", ".getProduct", function(){
            var data = table.row($(this).parents("tr")).data();
            $("#_id").val(data._id);
            $("#editnombre").val(data.nombre);
            $("#editstock").val(data.existencias);
            $("#editprecio").val(data.precio);
            $("#modal_editar_producto").modal("show");
		});
	}

    function putProduct(id, putData){
        $.ajax({
            method: "PUT",
            dataType: "JSON",
            url: url + "product/" + id,
            data: putData,
            headers: {
				Authorization: token,
			},
			success: function(response){
				alert(response.message);
				$("#modal_editar_producto").modal('hide');
                table.destroy();
				tabla();
			},
			error: function(response){
				alert(response.responseJSON.message);
			}
        })
    }

    function deleteProducts(tbody, table){
        $(tbody).on("click", ".deleteProduct", function(){
            var data = table.row($(this).parents("tr")).data();
            var id = data._id;
            $.ajax({
                method: "DELETE",
                dataType: "JSON",
                url: url + "product/" + id,
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

    function saveProducts(postData){
        $.ajax({
            url: url + "product",
            method: "POST",
            data: postData,
            dataType: "JSON",
            headers: {
                Authorization: token,
            },
            success: function(response){
                alert(response.message);
                $("#modal_crear_producto").modal("hide");
                location.reload();
            },
            error: function(response){
                alert(response.ResponseJSON.message);
            }
        });
    }
});

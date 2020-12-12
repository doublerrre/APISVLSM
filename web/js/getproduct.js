/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

if(!localStorage.getItem("ID_PRODUCTS")){
    window.location.replace("products.html");
}

$(function(){
    var token = localStorage.getItem("TOKEN_SVLSM");
    var url = "http://localhost:8000/api/";
    var id = localStorage.getItem("ID_PRODUCTS");

    getProduct();

    //Funciones
    function getProduct(){
        $.ajax({
            url: url + "product/" + id,
            method: "GET",
            headers: {
                Authorization: token,
            },
            success: function(response){
                let producto = response.data;
                let card_product = "";
                let card_user = "";
                let card_category = "";
                card_product += `
                        <h4 class="card-title">${producto.nombre}</h4>
                        <small class="text-muted">Stock: ${producto.existencias}</small>
                        <br>
                        <small class="text-muted">Precio: $${producto.precio}</small>
                        <br>
                        <small class="text-muted">Categoria: ${producto.category.nombre}</small>
                `;

                card_user += `
                        <h5 class="card-title">Vendedor: ${producto.user.nombre} ${producto.user.ap_pat} ${producto.user.ap_mat}</h5>
                        <h5>Detalles del contacto...</h5>
                        Correo Electronico: ${producto.user.email}
                        <br>
                        Direccion: ${producto.user.direccion}
                        <br>
                        Telefono: ${producto.user.telefono}
                `;

                card_category += `
                        <h5 class="card-title">Categoria: ${producto.category.nombre}</h5>
                        Fecha de creacion: ${producto.category.updated}
                `;

                $("#card_product").html(card_product);
                $("#card_user").html(card_user);
                $("#card_category").html(card_category);
            },
            error: function(err){
                alert(err.response.JSONresponse.message);
            }
        });
    }
});
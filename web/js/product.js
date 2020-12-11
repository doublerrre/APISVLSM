/* 	 
	╔═══╗ ♪
	║███║ ♫ API Rest SVLSM
	║ (●) ♫	Area Code F2
	╚═══╝♪♪
*/

"use strict"

$(function(){
    var token = localStorage.getItem("TOKEN_SVLSM");
    var url = "http://localhost:8000/api/";

    getAllProducts();

    //Eventos
    $(document).on("click", ".getId", function(){
        localStorage.setItem("ID_PRODUCTS", $(this).val());
        window.location.replace("product.html");
    })
    
    //Funciones
    function getAllProducts(){
        $.ajax({
            url: url + "products",
            method: "GET",
            headers: {
                Authorization: token,
            },
            success: function(response){
                console.log(response);
                let productos = JSON.parse(JSON.stringify(response.data));
                let plantilla_cards = "";

                productos.forEach(producto => {
                    plantilla_cards += `
                        <div class="card" style="width: 18rem;">
                            <img src="./img/404.gif" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                Stock: ${producto.existencias}
                                <br>
                                Precio: $${producto.precio}
                                <br>
                                Vendedor: ${producto.user.nombre}
                                <br>
                                Categoria: ${producto.category.nombre}
                                <br>
                                <button value="${producto._id}" href="#" class="getId btn btn-primary">Ver articulo...</button>
                            </div>
                        </div>
                    `;
                });
                $("#card_products").html(plantilla_cards);
            },
            error: function(err){
                alert(err.responseJSON.message);
            }
        });
    }
});
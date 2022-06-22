
$(document).ready(function () {
    let url = "https://pokeapi.co/api/v2/region"
    $.ajax({
        method: "GET",
        url: url,
    }).done(function (data){
        let listapokemones = data.results;
        let tabla = "";
        for (let i = 0; i < listapokemones.length; i++) {
            tabla += "<tr>";
            tabla += "<td>" + (i + 1) + "</td>";
            tabla += "<td>"+ listapokemones[i].name + "</td>";
            tabla += "<td><a href='detalleRegion/detalleRegion.html?region="+(i+1)+"' class='btn btn-primary botonDetalle'>" + "Detalle" + "</a></td>";
            tabla += "</tr>";
        }

        $("#body-paises").html(tabla);
    }).fail(function (e){
        console.log(e)
    })

});
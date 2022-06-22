
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idLocacion = urlParams.get('locacion');
    let url= "https://pokeapi.co/api/v2/location/"+idLocacion;

    $.ajax({
        method:"GET",
        "url" : url,
        datatype: "json",
        crossDomain: true,

    }).done(function (data){
        $("#labelLocacion").text("Locacion: "+data.name);
        $("#labelRegion").text("Región: "+data.region.name);
        let listaareas=data.areas;
        let contenthtml = "";
        $.each(listaareas,function (i,area){
            contenthtml+= "<tr>";
            contenthtml+= "<td>"+(i+1)+"</td>";
            contenthtml+= "<td>"+area.name+"</td>";
            let id= area.url.split("/");
            contenthtml+= "<td><a onclick=\"getpokemons(" + id[6] + ")\" class='btn btn-primary'>Ver pokemonos</a></td>";
            contenthtml+= "</tr>";
        });
        let idregion=data.region.url.split("/");
        let button="";
        button=button+"<a class=\"btn btn-primary\" role=\"button\" href=\"../detalleRegion/detalleRegion.html?region="+idregion[6]+"\">Regresar a la Region</a>"
        $("#retroceso").html(button);
        $("#tablaAreas").html(contenthtml);
    })
});

function getpokemons(idf){
    console.log(idf)
    let card="";
    let img="";
    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/location-area/"+idf,
        success: function (response){
            $("#areaSeleccionada").text("Pokemon a encontrarse en el Area: "+response.name);
            $.each(response.pokemon_encounters,function (key,value){
                let idpk=value.pokemon.url.split("/");
                card=card+"<div class=\"text-center col-2\" style='border: solid; margin-left: 50px; margin-right: 50px; margin-bottom: 50px'>" +
                    "<img id=\"imagen"+idpk[6]+"\" > <br>"+ "<h6>"+value.pokemon.name +"</h6>"+ "</div>"
                console.log(idpk[6])
                console.log("https://pokeapi.co/api/v2/pokemon/"+idpk[6])
                $.ajax({
                    type: "GET",
                    url: "https://pokeapi.co/api/v2/pokemon/"+idpk[6],
                    success: function (response1){
                        console.log("estuve aaqui")
                        $.each(response1.sprites,function (key1,value1){
                            $("#imagen"+idpk[6]).attr('src',response1.sprites.back_default);
                        });
                    },

                });
            });
            $("#pokemons").html(card);
        },

    });
}



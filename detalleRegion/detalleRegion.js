
$(document).ready(function () {
    // Metodo de obtención de parámetros
    const urlParams = new URLSearchParams(window.location.search);
    const idRegion = urlParams.get('region');
    let url= "https://pokeapi.co/api/v2/region/"+idRegion;

    $.ajax(
        {
            method:"GET",
            "url" : url,
            datatype: "json",
            crossDomain: true,
        }
    ).done(function (data){
        var pagina = 1;
        var cantidad = 10;
        $("#labelRegion").text("Región "+data.name);
        let listaLocaciones = data.locations.slice((pagina-1)*cantidad,(pagina)*cantidad);
        let paginas= Math.ceil(data.locations.length/cantidad);
        let paginadohtml="<li class='page-item disabled'><button class='page-link' id='previous' >Previous</button></li>";
        for(let i = 1; i<= paginas ; i++){
            if(i==pagina){
                paginadohtml+= "<li class='page-item active'><button value='"+i+"' class='page-link'>"+i+"</button></li>";
            } else{
            paginadohtml+= "<li class='page-item'><button value='"+i+"' class='page-link'>"+i+"</button></li>";
            }
        }
        paginadohtml+= "<li class='page-item'><button class='page-link' id='next' >Next</button></li>";
        $("#paginador").html(paginadohtml);

        let contenthtml = "";
        $.each(listaLocaciones, function (i, locacion){
            contenthtml+= "<tr>";
            contenthtml+= "<td>"+(i+1)+"</td>";
            contenthtml+= "<td>"+locacion.name+"</td>";
            let corte= locacion.url.split("/");
            contenthtml+= "<td><a href='../detalleLocacion/detalleLocacion.html?locacion="+ corte[6] +"' class='btn btn-primary'>Detalles</a></td>";
            contenthtml+= "</tr>";
        });
        $("#tablaLocaciones").html(contenthtml);

        $("button").click(function (){
            let pag=$("li[class='page-item active']");
            $(pag).attr("class","page-item");
            let id=$(this).attr("id");
            if(id!=null && id === "next"){
                console.log(id);
                pagina++;
            } else if(id!=null && id==="previous"){
                console.log(id);
                pagina--;
            } else{
                pagina = $(this).val();
            }
            pag=$("button[value='"+pagina+"']").parent();
            $(pag).attr("class","page-item active");
            let corner;
            if(pagina==paginas){
                corner = $("#next").parent();
                $(corner).attr("class","page-item disabled");
                $("#next").attr("disabled","disabled");
                corner = $("#previous").parent();
                $(corner).attr("class","page-item");
                $("#previous").removeAttr("disabled");
            } else if(pagina==1){
                corner = $("#previous").parent();
                $(corner).attr("class","page-item disabled");
                $("#previous").attr("disabled","disabled");

                corner = $("#next").parent();
                $(corner).attr("class","page-item");
                $("#next").removeAttr("disabled");

            } else{
                corner = $("#next").parent();
                $(corner).attr("class","page-item");
                $("#next").removeAttr("disabled");
                corner = $("#previous").parent();
                $(corner).attr("class","page-item");
                $("#previous").removeAttr("disabled");

            }


            listaLocaciones = data.locations.slice((pagina-1)*cantidad,(pagina)*cantidad);
            contenthtml = "";
            $.each(listaLocaciones, function (i, locacion){
                contenthtml+= "<tr>";
                contenthtml+= "<td>"+(i+1+(cantidad*(pagina-1)))+"</td>";
                contenthtml+= "<td>"+locacion.name+"</td>";
                let corte= locacion.url.split("/");
                contenthtml+= "<td><a href='../detalleLocacion/detalleLocacion.html?locacion="+ corte[6] +"' class='btn btn-primary'>Detalle</a></td>";
                contenthtml+= "</tr>";
            });
            $("#tablaLocaciones").html(contenthtml);

        });


    }).fail(function (err){
        alert("Ocurrio un error al cargar la página")
    });
});

$(document).ready(function(){
    console.log("Hola");
    let arrayCartas = $(".card");

    arrayCartas.each(function() {
        $(this).click(function(){
            let nombre = $(this).find("h2").text();
            peticionAsincrona(nombre);
        });
    });
});


function peticionAsincrona(nombre) {
    $.ajax({
        method: "GET",
        url: `https://swapi.dev/api/people/?search=${nombre}&format=json`
    }).done(function (data) {
        
        //console.log(data.results[0]);
        console.log(data.results[0].hair_color);
        /*console.log(data.results[0].skin_color);
        console.log(data.results[0].eye_color);
        console.log(data.results[0].height);
        console.log(data.results[0].gender);
        console.log(data.results[0].name);*/
        $.ajax({
            method: "GET",
            url: `${data.results[0].homeworld}`
        }).done(function (dataPlanet) {
            console.log(dataPlanet.name);
            imprimirResultados(data.results[0].name, data.results[0].gender, data.results[0].height, data.results[0].eye_color, data.results[0].skin_color, data.results[0].hair_color, dataPlanet.name);
            
        }).fail(function () {
            alert("Algo salió mal");
        })
    }).fail(function () {
        alert("Algo salió mal");
    })
}

function imprimirResultados(nombre, genero, altura, ojos, piel, pelo, planeta){
    let texto = $(`<div class="texto"><h2>Datos de ${nombre}</h2><p>Genero: ${genero}</p><p>Áltura: ${altura}cm</p><p>Color de ojos: ${ojos}</p><p>Color de piel: ${piel}</p><p>Color de pelo: ${pelo}</p><p>Planeta de origen: ${planeta}</div>`);
    $(".texto").remove();
    $(".container").append(texto);
}
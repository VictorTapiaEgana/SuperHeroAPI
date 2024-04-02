const API_URL = "https://www.superheroapi.com/api.php/"
const API_TOKEN  = "4905856019427443/"



$(document).ready(function () {
    
    BuscarHero(obtenerheroIDDeURL())
    
    //Funcion BuscarHero
    function BuscarHero (HeroSeachNumber){   

        $.ajax({            
            crossDomain: true,
            url: `${API_URL}${API_TOKEN}${HeroSeachNumber}`,
            method: "GET",        
            dataType: "JSON",        

            success: function (response) {
                
                $('#resultados').addClass('d-flex')
                //Generar Card
                LlenarDatos(response)
                //Generar Grafico
                Graficar(response)                  
                
            }
        });

    };//fin BucarHero


    //Extrar Datos y Generar Card
    function LlenarDatos ( datosGrafico ){

        //Imagen y alt
        $('#heroimagen').attr('src',datosGrafico.image.url);
        $('#heroimagen').attr('alt',`Nombre ${datosGrafico.name}`);

        //Nombre
        $('.card-title').html(`<span class="spanNombres">Nombre : </span>${ datosGrafico.name }</h5>`);
        
        //conexiones
        const DatosConecciones = datosGrafico.connections['group-affiliation'] != '-' ? datosGrafico.connections['group-affiliation'] : "Sin Informacion"
        $('#conecciones').html(`<span class="spanNombres">Conexiones : </span>${ DatosConecciones }`)

        //Punblicado por
        const Publicista = datosGrafico.biography.publisher != "" ? datosGrafico.biography.publisher  : "Sin Autor"
        $('#publicado').html(`<span class="spanNombres">Publicado :</span> ${Publicista}`)
    
        //Ocupacion
        const Ocupacion = datosGrafico.work.occupation != "-" ? datosGrafico.work.occupation : "Sin Registros"
        $('#ocupacion').html(` <span class="spanNombres">Ocupacion :  </span> ${Ocupacion}`)

        //Primera aparicion
        const PrimeraAparicion = datosGrafico.biography['first-appearance'] != "-" ? datosGrafico.biography['first-appearance'] : "Sin informacion"
        $('#aparicion').html(`<span class="spanNombres">Primera aparicion : </span>${PrimeraAparicion}`)
        
        //Altura
        let Altura = datosGrafico.appearance.height[0] != "-" ? datosGrafico.appearance.height[0] : ""
        Altura += datosGrafico.appearance.height[1] != "0 cm" ? " - " + datosGrafico.appearance.height[1] : "Sin Datos"
        $('#altura').html(`<span class="spanNombres">Altura : </span> ${Altura}`)

        //Peso
        let Peso = datosGrafico.appearance.weight[0] != "- lb" ? datosGrafico.appearance.weight[0] : ""
        Peso += datosGrafico.appearance.weight[1] != "0 kg" ? " - " + datosGrafico.appearance.weight[1] : "Sin Datos"
        $('#peso').html(` <span class="spanNombres">Peso :</span> ${Peso}`)

        //Alias
        var Alias =''

        if (datosGrafico.biography['aliases'][0] != '-' ){
            
            for (var x = 0; x <= datosGrafico.biography['aliases'].length - 1; x++){
                Alias += datosGrafico.biography['aliases'][x] + ' - '
            }

            Alias = Alias.slice(0,Alias.length - 3)             
            
        }else{
            Alias = "Sin alias conocidos"
        }

        $('#alianzas').html(` <span class="spanNombres">Apodos : </span> ${ Alias }`)
        
    }

    //Renderizar Grafico
    function Graficar(datosGrafico){
        var chart = new CanvasJS.Chart("grafico", {
            exportEnabled: true,
            animationEnabled: true,
            title:{
                text: `Estadisticas de Poder para "${datosGrafico.name}" (${datosGrafico.biography['full-name']})`,
                fontColor:"red",                

            },          
            data: [{
                type: "pie",
                showInLegend: true,
                toolTipContent: "{name}: <strong>{y}%</strong>",                
                indexLabel: "{name} - {y}%",                

                //Genera estadisticas de poder null
                //https://www.superheroapi.com/api.php/4905856019427443/544
                
                dataPoints: [
                    { y: datosGrafico.powerstats.intelligence === "null" ? 0 : datosGrafico.powerstats.intelligence,name: "Inteligencia" },
                    { y: datosGrafico.powerstats.strength     === "null" ? 0 : datosGrafico.powerstats.strength,    name: "Fuerza", exploded: true },
                    { y: datosGrafico.powerstats.speed        === "null" ? 0 : datosGrafico.powerstats.speed,       name: "Velocidad" },
                    { y: datosGrafico.powerstats.durability   === "null" ? 0 : datosGrafico.powerstats.durability,  name: "Durabilidad" },
                    { y: datosGrafico.powerstats.power        === "null" ? 0 : datosGrafico.powerstats.power,       name: "Poder" },
                    { y: datosGrafico.powerstats.combat       === "null" ? 0 : datosGrafico.powerstats.combat,      name: "Combate" }                    
                ]
            }]
        })
        
        chart.render();

    }//Fin Grafico

    //funcion para obteber el heroID de la URL    
    function obtenerheroIDDeURL() {
    
        var parametrosURL = new URLSearchParams(window.location.search);

        const IdHeroe = parseInt(parametrosURL.get('HeroID'));

        if (IdHeroe < 1 || IdHeroe > 731){
            window.location.href = `index.html`;            
        }else{
            return  IdHeroe
        }       

    }    

});
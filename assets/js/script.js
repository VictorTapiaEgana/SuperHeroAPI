var ExSoloNumeros=/^[0-9]+$/;
let HeroNumber = 0;

$(document).ready(function(){

//Validar datos de ingreso
    $("#HeroNumber").on("input", function(e) {
     
        if (!ExSoloNumeros.test(e.target.value)){
            $('#ErrorIngreso').html("Solo ingrese Numeros");
            $('#buscarHero').addClass("disabled")
            
            e.target.value="";
            HeroNumber = 0;
            return;
        } 

        $('#ErrorIngreso').html("")

        if(e.target.value < 1 || e.target.value > 731){

            $('#ErrorIngreso').html("Ingrese valor entre <br> 1 y 731");
            $('#buscarHero').addClass("disabled")

            e.target.value=""; 
            HeroNumber = 0;                  
            return;
        }    
        
        $('#buscarHero').removeClass("disabled")

        HeroNumber = e.target.value;
       
    });

    //Llamar a la funcion BuscarHero
    $('#buscarHero').on('click', function(e){

            e.preventDefault();            
        
            if(HeroNumber > 0){
                //Salto a la pagina 2
                window.location.href = `resultados.html?HeroID=${HeroNumber}`;            
            }
    })  


});//Fin document Ready
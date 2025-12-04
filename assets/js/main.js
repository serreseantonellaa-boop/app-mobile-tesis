//variables globales
//pantallas
let pantalla1 = document.getElementById('pantalla-1');
let pantalla2 = document.getElementById('pantalla-2');

pantalla1.addEventListener('click', inicio)

//funcion de inicio
function inicio(){
    pantalla1.classList.remove('disp')
    pantalla1.classList.add('no-disp')
    pantalla2.classList.remove('no-disp')
    pantalla2.classList.add('disp')
}
var socket = io();

let mensaje = document.getElementById("mensaje");
let enviar = document.getElementById("enviar");
let contenedor = document.getElementById("contenedor");
let contPer = document.getElementById("contPer");
let escribiendo = document.getElementById("escribiendo");

var persona;
var foto;

enviar.addEventListener('click', function () {

    msj = mensaje.value;
    socket.emit('chat:msg', {msj, persona, foto} );

});

mensaje.addEventListener('keyup', function () {
    if (persona) {
        socket.emit('typing', {msj, persona, foto})
    }
});

socket.on('chat:msgBack', function(data) {

    var date = new Date();
    contenedor.innerHTML += `<div class="message-data">
                                ${data.persona} - ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}
                                <img src="${data.foto}" alt="" >
                            </div>
                            <div class="message my-message">
                                ${data.msj}
                            </div>`

});

socket.on('typing', function(data){

    console.log("sadfasdasdas holaaaaa");
	if(data){
	  escribiendo.innerHTML = '<p><em>' + data.persona + ' esta escribiendo un mensaje...</em></p>';
	}else{
		escribiendo.innerHTML = '';
	}
});	

function getData(event){
    foto = event.children[0].currentSrc;
    persona = event.children[1].children[0].innerHTML;

    setP();
}

function setP(){
    contPer.innerHTML = `<a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                            <img src="${foto}" alt="avatar" />
                        </a>
                        <div class="chat-about">
                            <h6 class="m-b-0">${persona}</h6>
                            <small>online</small>
                        </div>`
}
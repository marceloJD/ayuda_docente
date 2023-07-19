const formulario = document.getElementById('formulario');
const botonGuardar = document.getElementById("guardar");
const agregar = document.getElementById("agregar");

const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');


const comboBox = document.getElementById('comboBox');

comboBox.addEventListener("change",() => {
    console.log(comboBox.value)
    cargarEstado()
})

prevButton.addEventListener('click', () => {
  carousel.scrollLeft -= carousel.offsetWidth;
});

nextButton.addEventListener('click', () => {
  carousel.scrollLeft += carousel.offsetWidth;
});



///CURSOS
fetch('../api/obtenerListaCursos',{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({})
})
.then(response => response.json())
.then(res => {
    console.log("resultado:",res)
    if(res.error){
        alert("ERROR")
        return ;
    }
    let lista = ''
    for (let i = 0 ; i<res.data.length;i++) {
        lista = lista + `
        <option value=${res.data[i].CODIGO}> ${res.data[i].Nombre}</option>
        `
    }
    comboBox.innerHTML = lista
    cargarEstado()
})



//ESTADO
let autoIncrmental=null;
let curso = null;
let estado = null;

function cargarEstado(){
    let id = comboBox.value;
    fetch('../api/obtenerListaDePesos',{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({curso:id})
    })
    .then(response => response.json())
    .then(res => {
        
        if(res.error){
            alert("ERROR")
            return ;
        }

        let lista = []
        for(let i in res.data.pesos){
            lista[lista.length]= res.data.pesos[i]
        }
        estado = lista
        curso=id
        autoIncrmental=res.data.ID
        //console.log("XXX:",estado)
        recargarEstado()
    })
}





function guardarDatos(){
    console.log("FETCHING")
    console.log("ESADO:",estado)
    console.log("ID:",autoIncrmental)
    console.log("CURSO",curso) 
    fetch('../api/modificarListaDePesos',{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({curso:curso, pesos:{pesos:estado,ID:autoIncrmental}})
    })
    .then(response => response.json())
    .then(res => {
        console.log("resultado:",res)
        if(res.error){
            alert("ERROR")
            return ;
        }else{
            alert("TODO BIEN")
            return ;
        }

    })
    
}




function anadirNota(n){
    estado.splice(n, 0, {nombre:"Nombre"  , peso:"10",id:autoIncrmental++});
    recargarEstado();
}

function removerElemento(n){
    estado.splice(n, 1);

    recargarEstado();
}

function recargarEstado(){
    const tbody = document.querySelector('.table');
    tbody.innerHTML=""
    let notas = estado
    console.log("recargarEstado",estado)
    for(let i in notas ){
        const row = document.createElement('table');
        row.classList.add("tamaño");
        row.style.position="relative"
        row.innerHTML=`

                <td>
                <input type="hidden" value=${notas[i].id} ></input>
                <input class=" form" name="curso" type="text" value=${notas[i].nombre} oninput="actualizarVariable(this.value,${i},'nombre')"></input>
                </td>
                <td>

                <input class= "form " name="nombre" type="text" value=${notas[i].descripcion} oninput="actualizarVariable(this.value,${i},'descripcion')"></input>
                </td>
                <td>

                <input class=" form" name="peso" type="number" value=${notas[i].peso} oninput="actualizarVariable(this.value,${i},'peso')"></input>

                </td>
                <button class="delete"   onclick="removerElemento(${i})">
                    <i class="fa-solid fa-trash-can"></i> 
                </button>
                <button class="mas" style="position: absolute; top: 50%; left: 100%; transform: translate(-50%, -50%); width:50px "  onclick="anadirNota(${i+1})">
                    +
                </button>

        `;

        tbody.appendChild(row);
    }
}


function actualizarVariable(value, n,m){
    estado[n][m]=value;
    console.log(estado)
}
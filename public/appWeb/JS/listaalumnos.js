// Recuperar la tabla y el botón
const tabla = document.getElementById("miTabla");
const botonGuardar = document.getElementById("guardar");
const formulario = document.getElementById('formulario');
const cargaralumno=document.getElementById('cargaralumno');





fetch('/api/obtenerListaCursos',{
  method:"POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({})
})
.then(response => response.json())
.then(res => {console.log(res)
var comboBox=document.getElementById("comboBoxCurso");
res=res.data;
res.map( opcion => {
  var option = document.createElement('option');
  option.value = opcion.CODIGO;
  option.textContent = opcion.Nombre;
  comboBoxCurso.appendChild(option);
});
})

fetch('/api/obtenerListaProfesores',{
  method:"POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({})
})
.then(response => response.json())
.then(res => {console.log(res)
var comboBoxProfe=document.getElementById("comboBoxProfe");
res=res.data;
res.map( opcion => {
  var option = document.createElement('option');
  option.value = opcion.CODIGO;
  option.textContent = opcion.Nombre;
  comboBoxProfe.appendChild(option);
});
})




let titulo = {
  "CODIGO": false,
  "DNI": false,
  "Nombre": true,
  "Apellidos": true,
  "Correo": true,
  "Direccion": true
}

cargaralumno.addEventListener("click",function(){
    let PROFESOR = document.getElementById("comboBoxProfe").value;
    let CURSO=document.getElementById("comboBoxCurso").value;
    console.log(PROFESOR,CURSO)
    const thead = document.querySelector('#miTabla thead tr');
    let contenido=" ";
    Object.keys(titulo).map(ti=>{
    contenido=contenido+`<th>${ti}</th>`
    })

    thead.innerHTML=contenido

    const requestInit ={
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"profesor":PROFESOR,"curso":CURSO})
    }
    fetch('/api/obtenerListaDeAlumnos',requestInit)
    .then(response => response.json())
    .then(res => {
      res=res.data;
      console.log(res)

    const tbody = document.querySelector('#miTabla tbody');
    let cont = ""
    res.map(obj => {

      
      let contenido="<tr>";
  
      Object.keys(titulo).map(ti=>{
        contenido=contenido+`<td><input type="text" class="DAT${ti}" value=${obj[ti]} ${titulo[ti]?" ":"disabled"}>
        </input></td>`

      })
      contenido=contenido+"</tr>"
      cont=cont+contenido
      
    });
    tbody.innerHTML=cont
    
})

});

formulario.addEventListener('submit', e => {
  e.preventDefault(); // Previene que se recargue la página al enviar el formulario
  var submitButton = document.activeElement;
  if(submitButton.value!='Agregar Alumno'){
    return;
  }
  const dni = document.getElementById('DNI').value;
  const nombre = document.getElementById('Nombre').value;
  const apellido = document.getElementById('Apellido').value;
  const correo = document.getElementById('Correo').value;
  const direccion = document.getElementById('Direccion').value;

  let datos = {
    "DNI": dni,
    "Nombre": nombre,
    "Apellidos": apellido,
    "Correo": correo,
    "Direccion": direccion
  }

const requestInit ={
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datos)
}
  fetch('/api/ingresarAlumno',requestInit)
  .then(res=>res.json())
  .then(res=>{
    console.log(res)
    if(res.resultado){
      alert("Alumno ingresado")
    }else{
      alert("Error al registrar alumno")
    }
    
  })
});
  

function editarAlumno(){
  const dni = document.getElementById('DNI').value;
  const nombre = document.getElementById('Nombre').value;
  const apellido = document.getElementById('Apellido').value;
  const correo = document.getElementById('Correo').value;
  const direccion = document.getElementById('Direccion').value;

  let datos = {
    "DNI": dni,
    "Nombre": nombre,
    "Apellidos": apellido,
    "Correo": correo,
    "Direccion": direccion
    
  }
  const requestInit ={
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(datos)
}
  fetch('/api/editarAlumno',requestInit)
  .then(res=>res.json())
  .then(res=>{
    console.log(res)
    if(res.resultado){
      alert("Alumno modificado")
    }else{
      alert("Error al registrar cambios")
    }
    
  })



}
  function guardarDatos() {
    let data=[]
    
    Object.keys(titulo).map(ti=>{
      let datos=document.getElementsByClassName("DAT"+ti)

      let informacion =[]
    
      for(let i=0;i<datos.length;i++){
        let valor = datos[i].value;
        informacion[informacion.length]=valor
      }
      console.log(informacion)
      data[data.length]=informacion
    })
    let info = []
    for(let j=0;j<data[0].length;j++){
      let i = 0
      let objeto ={}
      Object.keys(titulo).map(ti=>{
        objeto[ti]=data[i][j]
        i++
      })
      info[info.length]=objeto
    }
    console.log(info)
    const requestInit ={
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(info)
  }
    fetch('/api/modificarListaDeAlumnos',requestInit)
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      if(res.resultado){
        alert("Cambios ingresados correctamente")
      }else{
        alert("Error al registrar cambios")
      }
      
    })
} 
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
  option.textContent = opcion.Nombre+" "+opcion.Apellidos;
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
        contenido=contenido+`<td><input type="text" class="form-control DAT${ti}" value=${obj[ti]} ${titulo[ti]?" ":"disabled"}>
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
      Swal.fire({
        title: 'Menssaje',
        text: res.mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    }else{
      Swal.fire({
        title: 'Menssaje',
        text: res.mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
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
      Swal.fire({
        title: 'Menssaje',
        text: res.mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    }else{
      Swal.fire({
        title: 'Menssaje',
        text: res.mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
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
    Swal.fire({
      title: 'Cargando...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    fetch('/api/modificarListaDeAlumnos',requestInit)
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      if(res.resultado){
        Swal.fire({
          title: 'Menssaje',
          text: res.mensaje,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      }else{
        Swal.fire({
          title: 'Menssaje',
          text: res.mensaje,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
      
    })
} 




/////////////////////
function abrirCargarArchivo() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xlsx'; // Solo permite archivos con extensión .xlsx (Excel)
  input.addEventListener('change', procesarArchivo);
  input.click();
}

function procesarArchivo(event) {
  const archivo = event.target.files[0];
  if (archivo) {
    const lector = new FileReader();
    lector.onload = (e) => {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
      var headers = jsonData[0];
      jsonData = jsonData.slice(1);
      var resultado = jsonData.map((fila) => {
        var obj = {};
        for (var i = 0; i < headers.length; i++) {
          var campo = headers[i];
          obj[campo] = fila[i];
        }
        return obj;
      });
      mostrarTablaModal(resultado);
    };
    lector.readAsArrayBuffer(archivo);
  }
}


function mostrarTablaModal(data) {
  // Crear la fila de encabezados
  const encabezadosRow = Object.keys(data[0])
    .map((campo) => `<th>${campo}</th>`)
    .join('');

  // Crear las filas de datos
  const filas = data
    .map((objeto) => {
      const celdas = Object.values(objeto)
        .map((valor) => `<td>${valor}</td>`)
        .join('');
      return `<tr>${celdas}</tr>`;
    })
    .join('');

  // Crear el contenido del modal
  const contenidoModal = `
    <div class="table-responsive">
      <table id="miTabla" class="table table-bordered" width="100%" cellspacing="0">
        <thead>
          <tr>${encabezadosRow}</tr>
        </thead>
        <tbody>
          ${filas}
        </tbody>
      </table>
    </div>
  `;

  // Mostrar el modal utilizando SweetAlert con tamaño personalizado y botones de enviar y cancelar
  Swal.fire({
    title: 'Tabla de datos',
    html: contenidoModal,
    showCloseButton: true,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    customClass: {
      popup: 'swal-custom-modal',
    },
    width: '90%',
  }).then((result) => {
    if (result.isConfirmed) {      
      console.log('Enviar');

      fetch('/api/ingresarAlumnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            Swal.fire('Error', result.error.mensaje, 'error');
          } else {
            Swal.fire('Éxito', 'Los alumnos se ingresaron correctamente', 'success');
          }
        })
        .catch((error) => {
          Swal.fire('Error', 'Ocurrió un error al realizar la solicitud', 'error');
          console.error(error);
        });
      
      
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      
      console.log('Cancelar');
    }
  });
}


const comboBoxCurso = document.getElementById("comboBoxCurso");
const comboBoxProfe = document.getElementById('comboBoxProfe');
const DNI = document.getElementById('DNI');


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


////////
function guardarDatos(){
    let d = DNI.value;
    let c = comboBoxCurso.value;
    let p = comboBoxProfe.value;
    fetch('/api/ingresa',{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({curso:c,profesor:p})
    })
    .then(response => response.json())
    .then(res => {
        if(res.error){
            Swal.fire({
                title: 'Menssaje',
                text: res.mensaje,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
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
                text: "Data vacía...",
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });           
        }
        return;
    });

}

function cargarAlumno(){
  let d = DNI.value;
  let c = comboBoxCurso.value;
  let p = comboBoxProfe.value;
  fetch('/api/editarMatriculaAlumno',{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({curso:c,profesor:p,alumno:d})
  })
  .then(response => response.json())
  .then(res => {
      if(res.error){
        Swal.fire({
            title: 'Menssaje',
            text: res.mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
          return;
      }
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
            text: 'Data vacía',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
          
      }
      return;
  });

}
////////
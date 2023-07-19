
const comboBoxCurso = document.getElementById("comboBoxCurso");
const comboBoxProfe = document.getElementById('comboBoxProfe');
const fecha = document.getElementById('fecha');


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

function guardarDatos(){
    let f = fecha.value;
    let c = comboBoxCurso.value;
    let p = comboBoxProfe.value;
    fetch('/api/ingresarFechaLimite',{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({curso:c,profesor:p,fecha:f})
    })
    .then(response => response.json())
    .then(res => {
        if(res.error){
            alert("Error")
            return;
        }
        if(res.resultado){
            alert("OK")
            
        }else{
            alert("NO")
            
        }
        return;
    });

}

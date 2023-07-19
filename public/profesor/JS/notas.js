// Recuperar la tabla y el botón
const tabla = document.getElementById("miTabla");
const botonGuardar = document.getElementById("guardar");
const cargarcurso=document.getElementById('cargarcurso');

///ESTADO:
let curso=null
let notasOrdenadas=[1,2,3]
let notas ={
  1:{peso:30,nombre:"A"},
  2:{peso:40,nombre:"B"},
  3:{peso:30,nombre:"C"}
}
actualizarColumnasTabla()
actualizarFilasTabla([])

function actualizarColumnasTabla(){
  let cabecera = `
  <thead>
    <tr>
      <th>Codigo</th>
      <th>Nombre</th>
      <th>Apellido</th>`

  for(let i = 0 ; i<notasOrdenadas.length;i++){
    cabecera = cabecera + `
      <th>${notas[notasOrdenadas[i]].nombre}</th>
    `
  }
  cabecera = cabecera +`
      <th>Promedio</th>
    </tr>
  </thead>`
  tabla.innerHTML = cabecera
}

function actualizarFilasTabla(data){
  let filas = '<tbody id="datos">'
  let i = 0
  for (const d of data) {
    //console.log(d)
    i++;
    filas =filas+`<tr id=${"filaNumero"+i}>
      <td><input type="text" value="${d.CODIGO}" disabled> </td>
      <td><input type="text" value="${d.Nombre}" disabled></td>
      <td><input type="text" value="${d.Apellidos}" disabled></td>  
    `
    let n = 0;
    let sumaNotas = 0;
    let sumaPesos = 0;
    for (const nota of notasOrdenadas){
      filas =filas+`
      <td><input type="text" value="${d.notas[nota]}" onchange="actualizarPromedios(${i})"></td>     
      `
      sumaNotas = sumaNotas +(d.notas[nota]/1)*(notas[nota].peso/1)
      sumaPesos=sumaPesos+(notas[nota].peso/1)
    }
    let promedio=sumaNotas/sumaPesos
    filas =filas+`<td>
    <input type="hidden" value="${d.id}" >
    <input type="text" value=${promedio} id=${"promedioNumero"+i} disabled>
    </td>  
    </tr>`

  }
  filas=filas+'</tbody>'
  tabla.innerHTML=tabla.innerHTML+filas
}

function actualizarPromedios(i){
  let input = document.getElementById("promedioNumero"+i);
  let fila = document.getElementById("filaNumero"+i);
  const inputs = fila.getElementsByTagName('input'); // Obtener todos los inputs dentro de la fila
  const valores = Array.from(inputs).map(input => input.value); // Obtener los valores de los inputs en un array

  let sumaNotas = 0;
  let sumaPesos = 0;
  for (let index = 3; index < valores.length-2; index++) {
    let nota = valores[index]/1;
    let peso = notas[notasOrdenadas[index-3]].peso/1
    sumaNotas=sumaNotas+nota*peso
    sumaPesos=sumaPesos+peso
  }

  console.log(sumaNotas/sumaPesos);
  inputs[inputs.length-1].value=sumaNotas/sumaPesos
  
}

fetch('/api/obtenerListaCursosPorID',{
  method:"POST",
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({})
})
.then(response => response.json())
.then(res => {console.log(res)
  res=res.data
var comboBox=document.getElementById("comboBox");
res.map( opcion => {
  var option = document.createElement('option');
  option.value = opcion.CODIGO;
  option.textContent = opcion.Nombre;
  comboBox.appendChild(option);
});
})


cargarcurso.addEventListener("click",function(){
  let cur = document.getElementById('comboBox').value;
  fetch('/api/obtenerListaDePesos',{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({curso:cur})
  })
  .then(response => response.json())
  .then(res => {
    console.log(res)
    res = res.data;
    notasOrdenadas=Object.keys( res.pesos);
    notas = res.pesos
    curso=cur
    actualizarColumnasTabla()
    fetch('/api/obtenerListaDeAlumnosConNotas',{
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({curso:cur})
    })
    .then(response2 => response2.json())
    .then(res2 => {
      actualizarFilasTabla(res2.data)
      console.log("alumnos:",res2)
    })
  })

});

botonGuardar.addEventListener("click",()=>{
  console.log("guardarDatos")
  if(curso==null){
    Swal.fire({
      title: 'Mensaje',
      text: "Seleccione un curso",
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }
  let data = []
  let datos = document.getElementById("datos");
  let filas = datos.getElementsByTagName('tr');
  for(const fila of filas){
    let inputs = fila.getElementsByTagName('input');
    let valores = Array.from(inputs).map(input => input.value); 
    let objeto={CODIGO:valores[0], notas:{},id:valores[valores.length-2]}
    let i = 0
    for(const nota of notasOrdenadas){
      objeto.notas[nota]=valores[3+i]
      i++;
    }
    data[data.length]=objeto
  }
  console.log("ENVIANDO:",data)
  Swal.fire({
    title: 'Cargando...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
  fetch('/api/modificarListaDeNotas',{
    method:"POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({curso,array:data})
  })
  .then(response => response.json())
  .then(res => {
    console.log(res)
    if(res.error){
      Swal.fire({
        title: 'Mensaje',
        text: res.mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
    }else{
      Swal.fire({
        title: 'Mensaje',
        text: res.mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
    }
  })
})

fetch('/api/verificarFechaLimite', {
  method: "POST",
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
})
  .then(response => response.json())
  .then(res => {
    console.log("RESP:", res);
    if (res.error) {
      Swal.fire({
        title: 'Mensaje',
        text: res.mensaje,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      // Filtrar cursos con menos de 7 días restantes
      const cursos = res.data.filter(curso => {
        const fechaLimite = new Date(curso.fechaLimite);
        const hoy = new Date();
        const diasRestantes = Math.ceil((fechaLimite - hoy) / (1000 * 60 * 60 * 24));
        return diasRestantes < 7;
      });
      if(cursos.length<1){
        return;
      }

      // Construir el contenido del mensaje
      let mensaje = '<ul>';
      cursos.forEach(curso => {
        const diasRestantes = Math.ceil((new Date(curso.fechaLimite) - new Date()) / (1000 * 60 * 60 * 24));
        mensaje += `<li>${curso.Nombre} ( ${curso.fechaLimite} ): Faltan ${diasRestantes} días</li>`;
      });
      mensaje += '</ul>';

      // Mostrar el mensaje con SweetAlert
      Swal.fire({
        title: 'Cursos con fecha límite cercana',
        html: mensaje,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
  });

////////////////////////////

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
        obj.notas = []
        for(var i = 0; i < notasOrdenadas.length; i++){
          let nombreNota = notas[notasOrdenadas[i]].nombre
          obj.notas[notasOrdenadas[i]]=obj[nombreNota]
        }
        return obj;
      });

      console.log(resultado)
      actualizarFilasTabla(resultado);
    };
    lector.readAsArrayBuffer(archivo);
  }
}



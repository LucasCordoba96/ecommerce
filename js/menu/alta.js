const productos = [] //Array de productos

const inputs = document.querySelectorAll('input') 
const form = document.querySelector('main form')
const button = document.querySelector('button')



let camposValidos = [false, false, false, false, false, false, false ]



function algunCampoNoValido() {
    let valido =  //todos los campos deben ser true para que todo sea true.
        camposValidos[0] &&
        camposValidos[1] &&
        camposValidos[2] &&
        camposValidos[3] &&
        camposValidos[4] &&
        camposValidos[5] &&
        camposValidos[6] 

    return !valido

}

const setCustomValidity = function(mensaje,index) {
    const divs = document.querySelectorAll('form div') //Hago referencia a todos los divs que están dentro del form
    divs[index].innerText = mensaje
    divs[index].style.display = mensaje? 'block' : 'none' // con esto pregunto: hay mensaje? Si lo hay, modifico el display a block, en caso que no lo haya, se modifica a none.
}
// Esto es para que aparezca el mensaje de validación en los divs que están abajo de los input
/* setCustomValidity('Campo no válido') */

function validar(valor, validador, index ){
    if(!validador.test(valor)){
        setCustomValidity('Este campo no es válido', index) 
        button.disabled = true
        camposValidos[index] = false
        return null
    }

    camposValidos[index] = true
    

    setCustomValidity('', index) 
    return valor
}

const regExpValidar = [

    /^.+$/, //regexp nombre
    /^[0-9-]+$/, //regexp precio
    /^[0-9-]+$/, //regexp stock
    /^.+$/, //regexp marca
    /^.+$/, //regexp categoria
    /^.+$/, //regexp detalle
    /^.+$/, //regexp foto
]

inputs.forEach((input,index) => {
    if(input.type != 'checkbox') {
        input.addEventListener('input', () => {
            validar(input.value, regExpValidar[index],index)
        })
    }
})


form.addEventListener('submit',  e => {
    e.preventDefault()

    let producto = {
        nombre: inputs[0].value,
        precio: inputs[1].value,
        stock: inputs[2].value,
        marca: inputs[3].value,
        categoria: inputs[4].value,
        detalles: inputs[5].value,
        foto: inputs[6].value,
        envio: inputs[7].checked
    }

    
    
   productos.push(producto)
   renderProds()

   inputs.forEach(input => {
    if(input.type == 'checkbox') input.checked = false
    else input.value = ''
   })
  
   camposValidos = [false,false,false,false,false,false,false]
//Recorro al array de inputs con el forEach
   inputs.forEach( input => {
    if(input.type == 'checkbox') input.checked = false
    else input.value = ''
    })
    
    camposValidos = [false, false, false, false, false, false, false ]
 })



function renderProdsObjetos() {
    let html = ''

    for(let i=0; i<productos.length; i++) {
        html += `<p>${JSON.stringify(productos[i])}</p>`
    }
    document.getElementById('listado-productos').innerHTML = html
}



function renderProds() {
    let html = ''

    html += '<table>'

    html += `
        <tr> 
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Marca</th>
            <th>Categoría</th>
            <th>Detalles</th>
            <th>Foto</th>
            <th>Envío</th>
        </tr>
    `
    for(let i=0; i<productos.length; i++) {
        let producto = productos[i]
        html += `
        <tr> 
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.stock}</td>
            <td>${producto.marca}</td>
            <td>${producto.categoria}</td>
            <td>${producto.detalles}</td>
            <td>${producto.foto}</td>
            <td>${producto.envio}</td>
        </tr>
    `
      

    }

    html += '</table>'
    document.getElementById('listado-productos').innerHTML = html
}
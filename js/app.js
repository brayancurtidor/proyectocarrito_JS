const carrito=document.querySelector('#carrito');//mando a traer la etiqueta por su id (vid)
const contenedorCarrito=document.querySelector('#lista-carrito tbody'); //llamando a la tabla
const vaciarCarrito=document.querySelector('#vaciar-carrito'); //es el boton de vaciar carrito
const listaCursos=document.querySelector('#lista-cursos');//vamos a llamr el lugar en dodne seencuentra la lista de cursos
let arrayMeterProductosalcarro=[];

cargarListadoEventos();
function cargarListadoEventos()
{
    listaCursos.addEventListener('click',agregarCurso);
    carrito.addEventListener('click',eliminarcursodelcarrito);
    carrito.addEventListener('click',desmontardelcarrito);
    vaciarCarrito.addEventListener('click',()=>
    {
        arrayMeterProductosalcarro=[]; //reseteamos el carrito
        carritoHTML();//mandamos a llamar carrito despues de resetear el html
        console.log("vaciando");
    }
    );
}




function agregarCurso(e)
{
    e.preventDefault();//no va a buscar un id cuando en el enlace esta #
    if(e.target.classList.contains('agregar-carrito')) //contains quiere decir que si doy click agregar-carrito me hara una accion
    {
    const cursoselecionado=e.target.parentElement.parentElement; //cuando seleciono un boton regreso al padre y vuelvo a regresar nuevamente al padre que contiene la info esto es hablando de divs
    //y tambien muestra en que etiqueta se encuentra po rejemplo, la imagen, el nombre, apellido etc etc


    leerDatosCurso(cursoselecionado); //llenando la funcion con argumentos
    }
}



 //elmina un curso del carrito
 function eliminarcursodelcarrito(e)
 {
 if (e.target.classList.contains('borrar-curso'))
 {
     const cursoid=e.target.getAttribute('data-id'); 
    
     //eliminar del arreglo de articulos po rel data-id
     //recore todo el arreglo y no muestra el articulo con el id que eliminamos
    arrayMeterProductosalcarro=arrayMeterProductosalcarro.filter(cursoelimnar=>cursoelimnar.id !==cursoid);
carritoHTML();//volemos a iterar con el html y lo mostranos


 }  
}

//funcion de desmonteo
//elmina un curso del carrito
 function desmontardelcarrito(e)
 {

    const cursos1=arrayMeterProductosalcarro.map(cursomapa=>
     {
        if (e.target.classList.contains('desmontar'))
        {
            const cursoid=e.target.getAttribute('data-id'); 
            if(cursomapa.id===cursoid)
            {
       
            cursomapa.cantidad--;
            if( cursomapa.cantidad===0)
            {
                console.log("tratando de eliminar")
                arrayMeterProductosalcarro=arrayMeterProductosalcarro.filter(cursoelimnar=>cursoelimnar.id !==cursoid);
                carritoHTML();//volemos a iterar con el html y lo mostranos


            }
            }


        }    
           

     })
    carritoHTML();


 }




//lee el conteniodo al que le dimos click y  luego los atrapa
function leerDatosCurso(curso) 
{



    console.log(curso);//muestra en consola todo lo que recolecto curso
//crear un objeto con los datos obtenidps
//cabe mencionar que la variable curso ya tiene toda la info del curso
const infoCurso={
    imagen:curso.querySelector('img').src,//extraemos la imagen junto a su link ('img') la saque viendo el console.log(curso) ya que ahi me muesntra en donde esta la informacion
    titulo:curso.querySelector('h4').textContent,// textContent agarra el texto que esta en la etiqueta h4
    precio:curso.querySelector('.precio span').textContent, //(.precio=llamando a la clase         span(el precio que deseo esta dentro del span)) //(.precio span) se pone asi por que el span esta dentro de la clase precio
    id:curso.querySelector('a').getAttribute('data-id'),// se esta sacando la informacion de la misma etiqueta, se saca el atributo
    cantidad:1,
    
}
//revisa si un elemento ya existe en el carrito, .some permite iterar en un arreglo de objetos y verificar siexiste
const verificar= arrayMeterProductosalcarro.some(cursoverificar=> cursoverificar.id===infoCurso.id);//esto es un itrador,pero del arreglo, y va comparando con cada uno de lo ids del arreglo con cada uno de los del objeto creado
if(verificar)
{
    //actualizamos la cantidad
    const cursos=arrayMeterProductosalcarro.map(cursomap=>{
        if(cursomap.id===infoCurso.id) //cuando encuentre el id duplicado
        {
            cursomap.cantidad++;
            

            return cursomap; //este retorna loso objeto actualizados

        }
        else //caso contrario me retornara el curso como esta
        {
            return cursomap;//este retorna los objetos que no estan duplicados y por ende no se actualzan

        }
    })
arrayMeterProductosalcarro=[...cursos];
}
else
{
    //vamos a ingresar AL NUEVO PRODCTO
    //agrega elementos al carrito arreglo
arrayMeterProductosalcarro=[...arrayMeterProductosalcarro,infoCurso]; //vamos a traer al carrito y cada ves le vamos a meter informacion mas de las que ya tiene
console.log(infoCurso)
console.log(arrayMeterProductosalcarro);
}
alert("Agregando al carrito...")
carritoHTML();
}





//muestra el arreglo en el html
function carritoHTML()
{
    //limpiar el html
limpiarhtml();

    //corre el carrito y genera el html
    arrayMeterProductosalcarro.forEach(cursoso => {
            const row=document.createElement('tr');//estamos creando una variable row y esta tendra dentro etiquetas html tipo tr
            const {imagen,titulo,precio,cantidad,id}=cursoso//usando destructurin

            row.innerHTML=`
            <td>
            <img  src="${imagen}" width="100"> </img>
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
        
            <td>
            <a href="#" class="borrar-curso" data-id="${id}">Eliminar</a>
        </td>
        <td>
        <a href="#" class="desmontar" data-id="${id}" >desmontar</a>
    </td>

           
            `
            //agregando el html del carrito en el tbody
            contenedorCarrito.appendChild(row)
        });
}
//elimina los cursos de mas que me general el apendchild
function limpiarhtml()
{
    //forma lenta
    //contenedorCarrito.innerHTML="";
    //mjeor performance

    while(contenedorCarrito.firstChild)//si tengo un hijo se ejecuta el while
    {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild) //se elimna el primer hijo hasta que quede sin hijos 
    }
}

// Array de productos disponibles.
const productos = [
  {nombre: "Melgeek Mojo 84", precio: 12000},
  {nombre: "Tofu60 Sushi", precio: 8000},
  {nombre: "Nuphy Air 75%", precio: 10000},
  {nombre: "ZSA Moonlander", precio: 15000},
];

// Array vacio que iremos llenando con los productos seleccionados.

let carrito = []

// Damos la bienvenida y comenzamos la seleccion de productos.

let seleccion = prompt("Hola, bienvenido a Angry Keys, empezamos la compra?, (si/no)")
while(seleccion != "si" && seleccion != "no"){
  alert("Por favor ingrese si o no")
  seleccion = prompt("Querés tener los mejores teclados del mercado? si o no")
}

if (seleccion === "si"){
  alert("Te dejo los teclados mecánicos que tenemos en stock:")

//Funcion para agregar productos al carrito en base a una lista dada en base al index.

  function agregarProducto(productos, carrito) {
    let todosLosTeclados = productos.map((producto, index) => (index + 1) + ". " + producto.nombre + " - $" +producto.precio );
    let productoSeleccionado = parseInt(prompt(todosLosTeclados.join("\n") + "\n\n Ingrese el número del producto que desea agregar a su carrito:"));
    while (productoSeleccionado < 1 || productoSeleccionado > productos.length || isNaN(productoSeleccionado)) {
      alert("Por favor, ingrese un número válido correspondiente al producto que desea agregar a su carrito.");
      productoSeleccionado = parseInt(prompt(todosLosTeclados.join("\n") + "\n\n Ingrese el número del producto que desea agregar a su carrito:"));
    }
    let producto = productos[productoSeleccionado - 1].nombre;
    let precio = productos[productoSeleccionado - 1].precio;
    let unidades = parseInt(prompt("¿Cuántos teclados " + producto + " te gustaría llevar?"));
    carrito.push({producto, unidades, precio});
    return {producto, unidades, precio};
  }

//Funcion para agregar mas productos despues de haber elegido uno anterior.

  let agregarMasProductos = true;
  while (agregarMasProductos) {
    agregarProducto(productos, carrito);
    let continuar = prompt("¿Desea agregar más productos al carrito? (si/no)");
    agregarMasProductos = continuar === "si";
  }

  console.log(carrito);
} else if (seleccion === "no") {
  alert("Gracias por visitarnos, ¡vuelve pronto!");
} else {
  alert("Por favor, ingrese si o no.");
}

//calculo del total de la compra recorriendo el carrito.

let  totalCompra = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0)

// Función para calcular el costo del envío si el total supera x cantidad de $.

const envio = () => {
  if (totalCompra >= 15000) {
    alert("El total de tu compra es: $ " + totalCompra + " , el envío es gratuito a todo el país.")
  } else if (totalCompra > 0){
    totalCompra += 2500
    alert("Se sumaron $2500 por el envío a tu domicilio, el total de tu compra es de: $" + totalCompra + " , se sumaron $2500 por el envío")
  } 
}
envio()


// Valida si el total de la compra es distinto de 0, si es distinto entra a elegir el metodo de pago si no arroja cartel y cierra.
// Seleccion de metodo de pago, si es efectivo descontamos $5000 del total, si es tarjeta hay 3 opciones 1,3 y 6 pagos. 3 y 6 con Interes

if (totalCompra !==0){
  let metodoPago = prompt("Seleccione el método de pago: efectivo o tarjeta")
  while(metodoPago != "efectivo" && metodoPago != "tarjeta"){
    alert("Por favor ingrese efectivo o tarjeta")
    metodoPago = prompt("efectivo o tarjeta")
  }
  
  if (metodoPago === "efectivo") {
    totalCompra -= 5000
    alert("Se aplicó un descuento de $5000.")
    alert("El total a pagar es: $" + totalCompra)
    alert("Gracias por su compra!")
  } else if (metodoPago === "tarjeta") {
    let cuotas = parseInt(prompt("Ingrese la cantidad de cuotas: \n 1 - Sin recargo \n 3 - con 15% de recargo \n 6 - con 30% de recargo)"))
    let recargo = 0
    switch(cuotas) {
      case 1:
        recargo = 0
        break
      case 3:
        recargo = 0.15
        break
      case 6:
        recargo = 0.3
        break
      default:
        alert("Cantidad de cuotas inválida.")
        break
    }

    //Calculo de totales con recargo, valor de cuotas, redondeo a 2 decimales e informar totales.

    let totalConRecargo = totalCompra + (totalCompra * recargo)
    let valorCuotas = totalConRecargo / cuotas
    let valorCuotaRedondeado = valorCuotas.toFixed(2);
    alert("El total a pagar con recargo es: $" + totalConRecargo + " el valor de cada cuota será de: $" + valorCuotaRedondeado)
    alert("Gracias por tu compra! ")
  }
} else{
  alert("El carrito está vacío, no hay nada que pagar. Saludos!")
}

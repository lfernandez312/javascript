function plazoFijo (plazo) {
    
    let monto = Number(prompt("Ingrese el valor a invertir en PESOS")); //Ingreso el valor a invertir en PESOS como numero 
    alert("Usted ha elegido simular por "+plazo+" dias"); 
    const tasaInteres = 97; //Variable de tasa la cual se modifica manual en base al indice
    alert("La tasa actual de interes anual es del "+tasaInteres+"%");

    let interesesGanados = (parseFloat(monto) * (1 + (parseFloat(tasaInteres) / 100)) / parseFloat(plazo)); // calculo el monto a invertir en base al porcentaje del interes sobre la cantidad de dias que deseo invertir
    let montoTotal = parseFloat(monto) + parseFloat(interesesGanados); // Sumo el monto con el invertido
   
    alert('Tu total de interes ganado es $'+interesesGanados.toFixed(2)+' en ' + plazo + ' dias');
    alert('El monto total de tu inversion es de $'+montoTotal.toFixed(2)+ ' ,simulado a ' + plazo + ' dias');

    console.log(monto); 
    console.log(tasaInteres);
    console.log(plazo);
    console.log(parseFloat(monto) * (1 + (parseFloat(tasaInteres) / 100)) / 12);
    console.log(parseFloat(monto) + parseFloat(interesesGanados));
}

function abrirCuente(){
    alert("Actualmente no se encuentra habilitado, volve otro día!"); //No disponible por el momento
}

function iniciarSesion() {
    alert("Hola!, Bienvenido a Banco CH");

    let variableUsuario = prompt('Ingrese su Usuario (Valida solo con usuario coderhouse)'); //Variable del usuario
    let variablePassword = prompt('Ingrese su password (Valida solo con password coderhouse)');//Variable de la pass
   

    if (variableUsuario === "coderhouse" && variablePassword === "coderhouse") { //si es igual al usuario y pass coderhouse es true y sigo 
        alert('Login exitoso');

    } else {   //si es distinto al usuario y pass coderhouse es false y hago que tenga 2 intentos para poner bien sus credenciales, sino bloqueo. 

        let intento= 1;
        let canIntentos=2; 
        alert("Error!, Intente loguearse nuevamente, solo tiene 2 intentos más"); 

        while (intento <= canIntentos) {

            alert(`Intento Numero #${intento}`);

            variableUsuario = prompt('Ingrese su Usuario (Valida solo con usuario coderhouse)');
            variablePassword = prompt('Ingrese su password (Valida solo con password coderhouse)');
            
            intento++;
        }
        if (canIntentos === 2) {
            alert("Usuario Bloqueado"); //Bloqueado        
            return;
        }

       
    }
}

function tarjetaCredito(plastico){
  
    switch (plastico) { // Busco dependiendo el tipo de plastico el que corresponde        
      case 1:
        nombreTarjeta = 'Por tu perfil crediticio: Calificas con una Tarjeta Mastercard disponible';
        alert (nombreTarjeta);
        break;
      case 2:
        nombreTarjeta = 'Por tu perfil crediticio: No calificas para una Tarjeta Visa';
        alert (nombreTarjeta);
        break;
      default:
        nombreTarjeta = 'Tarjeta Invalida';
        alert (nombreTarjeta);
    }
    
    console.log('La tarjeta disponible es:', nombreTarjeta);
}


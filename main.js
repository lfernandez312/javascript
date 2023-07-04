const clientes = [
    ["Leonel Fernandez", 500000, 3000, 1234, 1234567],
    ["Pedro Mendez", 400000, 10000, 12345, 12345678],
    ["Maribel Cora", 50000, 5000, 123456, 123456789],
    ["Jose Pepe", 50000, 5000, 1234567, 123],
    ["Mica Arcuci", 0.19, 5000, 12345678, 12345]
];

let clienteActual = null; // Variable para almacenar el cliente seleccionado

function listaCliente() {
    if (!clienteActual) {
        alert("Debe seleccionar un cliente antes de iniciar sesión.");
        return;
    }  else {
        alert("Se mostrará el listado de clientes");
        alert("La longitud de cada array es de "+clientes.length);
        alert(clientes.sort());
        alert("Tu usuario es el numero "+ clientes.indexOf(clienteActual) ) // ⇒ 0
        console.log( clientes.join(", ") ) 

    }
}

////////////////////////DECLARACION DE CLIENTES/////////////////////////////////

function seleccionarCliente() {
    let opcionesClientes = "";
  
    for (let i = 0; i < clientes.length; i++) {
      opcionesClientes += (i + 1) + ". " + clientes[i][0] + "\n";
    }
    
    let clienteSeleccionado = prompt("Seleccione un cliente:\n" + opcionesClientes);
    clienteIndex = parseInt(clienteSeleccionado);
    
    if (isNaN(clienteIndex) || clienteIndex < 1 || clienteIndex > clientes.length) {
      alert("Cliente no válido. Por favor, seleccione un número válido.");
      return;
    }
    
    clienteActual = clientes[clienteIndex - 1];
    nombreUsuario = clienteActual[0];
    saldoCuenta = clienteActual[1];
    limiteExtraccion = clienteActual[2];
    claveCorrecto = clienteActual[3];
    cuentaAmigo1 = clienteActual[4];
    
    alert("Cliente seleccionado: " + nombreUsuario);
  }

////////////////////////DECLARACION DE VARIABLES LET/////////////////////////////////
const fechaActual = new Date();

let sesionIniciada = false; // Variable para controlar si la sesión ha sido iniciada

////////////////////////INICIO DE SESION/////////////////////////////////////////////

//inicio la sesión validando el código de seguridad declarado en claveCorrecto
function iniciarSesion() {
    seleccionarCliente();
    if (!clienteActual) {
        alert("Debe seleccionar un cliente antes de iniciar sesión.");
        return;
    } else { 
        let solicitarElCodigoDeSeguridad = prompt("Ingrese el código de seguridad. Se recomienda " + clienteActual[3]);
        console.log(claveCorrecto + " " + solicitarElCodigoDeSeguridad);
        if (solicitarElCodigoDeSeguridad != claveCorrecto) {
            return;
        } else {
            //en caso de que sea válido avanzo, sino contraseña errónea
            let mensajeUsuario = "Bienvenido " + nombreUsuario.toUpperCase() + " ya puedes comenzar a utilizar tu cuenta.";
            alert(mensajeUsuario);
            console.log("El usuario: " + nombreUsuario.toUpperCase() + " con Pass: " + solicitarElCodigoDeSeguridad + " se logueó correctamente: " + fechaActual);
            sesionIniciada = true; // Actualiza el estado de la sesión

        }
    }
}


//////////////////////////////SALDO Y LIMITE EXTRACCION/////////////////////////////////////////

//consulto el saldo que tengo actualmente en mi cuenta
function verSaldo() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;

    } else {
        alert("El saldo en la cuenta es de $" + saldoCuenta);
    }
}

//consulto el limite de extraccion que tengo actualmente en mi cuenta
function limite() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;

    } else {
        alert("El limite de extraccion es de $" + limiteExtraccion);
    }
}

////////////////////////////////CLASS CLIENTE//////////////////////////////////////////////
//genero una clase con mi usuario
class Cliente {
    constructor(nombreUsuario) {
        this.nombreUsuario = nombreUsuario.toUpperCase();
        this.edad = null;
        this.fechaNacimiento = null;
        this.calle = null;
    }
}

/////////////////////////////////////FUNCIONES INTERACTIVAS////////////////////////////////////


//actualizo los datos personales, NO DECLARADOS ANTERIORMENTE
function actualizarDatosPersonales() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;
        
    } else {
        let calle = prompt("Ingresa tu domicilio:");
        console.log("Se cargo correctamente el domicilio: " + calle);
        let fechaNacimientoStr = prompt("Ingrese su fecha de nacimiento en formato AAAA-MM-DD:");
        let fechaNacimiento = new Date(fechaNacimientoStr);
        //valido que la fecha sea correcta, sino no puedo calcular correctamente la edad
        while (isNaN(fechaNacimiento.getTime())) {
            alert("Fecha de nacimiento inválida. Por favor, ingrese una fecha válida en el formato AAAA-MM-DD.");
            fechaNacimientoStr = prompt("Ingrese su fecha de nacimiento en formato AAAA-MM-DD:");
            fechaNacimiento = new Date(fechaNacimientoStr);
        }
        //calculo la edad en base a la fecha incluida en el prompt
        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        const mesActual = fechaActual.getMonth();
        const diaActual = fechaActual.getDate();
        const mesNacimiento = fechaNacimiento.getMonth();
        const diaNacimiento = fechaNacimiento.getDate();

        if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
            edad--;
        }

        console.log("Se cargo la fecha de nacimiento:  " + fechaNacimientoStr);
        console.log("Tu edad es: " + edad);
        const cliente1 = new Cliente(nombreUsuario);
        //en base a los datos declarados creo una constante para alertarlos y mostrarlos en pantalla
        const mensajesDatosActualizados = "Tu nombre completo es: " + cliente1.nombreUsuario.toUpperCase() + "\nTu fecha de nacimiento es: " + fechaNacimientoStr + "\nTu edad es: " + edad + "\nTu domicilio es: " + calle.toUpperCase();
        alert(mensajesDatosActualizados);
    }
}
//Realizo el cambio del limite y asigno nuevo valor, siempre y cuando ni supere el limite establecido
function cambiarLimiteDeExtraccion() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;
        
    } else {
        let nuevoLimiteDeExtraccion = prompt("Ingese el nuevo limite de extracción");
        let numeroLimiteDeExtraccion = parseInt(nuevoLimiteDeExtraccion);
        //Para que me de "true" al comparar la letiable. Necesito utilizar Number.isNanN, debido a que si comparo NaN con NaN va a dar negativo por nada no es igual a "NaN" es contradictorio pero propio de Js.
        if (Number.isNaN(numeroLimiteDeExtraccion)) {
            alert("El maximo de limite de extracción es de $50.000")
            return;
        }
        if (nuevoLimiteDeExtraccion == null || nuevoLimiteDeExtraccion == "") {
            return;
        }
        limiteExtraccion = numeroLimiteDeExtraccion;
        let mensajeLimite =
            "El nuevo limite de extraccion es $ " + numeroLimiteDeExtraccion;
        alert(mensajeLimite);
    }
}

//extraigo dinero, mientras cumpla con los requisitos de validacion.
function extraerDinero() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;
        
    } else {
        let dineroAExtraer = prompt("Ingrese la cantidad de dinero a extraer");
        let numeroDineroAExtraer = parseInt(dineroAExtraer);
        if (Number.isNaN(numeroDineroAExtraer)) {
            return;
        }
        if (dineroAExtraer == null || dineroAExtraer == "") {
            return;
        }
        if (!haySaldoEnLaCuenta(numeroDineroAExtraer)) {
            alert("No hay saldo en tu cuenta para extraer esa cantidad de dinero.");
            return;
        }
        if (superaLimiteDeExtraccion(dineroAExtraer)) {
            alert("La cantidad de dinero a extraer supera tu limite por transacción");
            return;
        }
        if (!esMultiplode100(dineroAExtraer)) {
            alert(
                "Solo puede retirar en billetes de $100. Procure que el monto corresponda a uno de sus multiplos."
            );
            return;
        }
        let saldoAnterior = saldoCuenta;
        restarDinero(numeroDineroAExtraer);
        let mensajeExtraccion =
            "El saldo a extraer es de $ " +
            dineroAExtraer +
            "\nEl saldo anterior era de $ " +
            saldoAnterior +
            "\n El saldo actual es de $ " +
            saldoCuenta;
        alert(mensajeExtraccion);
    }
}

function depositarDinero() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;
        
    } else {
        let dineroADepositar = prompt("Ingrese la cantidad de dinero a depositar");
        let numeroDineroADepositar = parseInt(dineroADepositar);
        if (Number.isNaN(numeroDineroADepositar)) {
            return;
        }
        if (dineroADepositar == null || dineroADepositar == "") {
            return;
        }
        let saldoIncial = saldoCuenta;
        sumarDinero(numeroDineroADepositar);
        let mensaje =
            "El saldo a depositar es de $ " +
            dineroADepositar +
            "\nEl saldo incial era de $ " +
            saldoIncial +
            "\nEl saldo final es de $ " +
            saldoCuenta;
        alert(mensaje);
    }
}

function pagarServicio() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;
        
    } else {
        let saldoPrimero = saldoCuenta;
        let serviciosAPagar = prompt(
            "Ingrese el numero correspondiente al servicio que quiere pagar" + "\n" +
            1 + " - Agua" + "\n" +
            2 + " - Luz" + "\n" +
            3 + " - Internet" + "\n" +
            4 + "- Teléfono"
        );
        if (serviciosAPagar == null || serviciosAPagar == "") {
            return;
        }
        const servicioADescontar = prompt("Ingrese el monto del servicio que desea abonar");
        switch (serviciosAPagar) {
            case "1":
                servicioADescontar;
                if (!puedePagarElServicio(servicioADescontar)) {
                    alert("No posee saldo para pagar este servicio.");
                    return;
                }
                restarServicio(servicioADescontar);
                break;
            case "2":
                servicioADescontar;
                if (!puedePagarElServicio(servicioADescontar)) {
                    alert("No posee saldo para pagar este servicio.");
                    return;
                }
                restarServicio(servicioADescontar);
                break;
            case "3":
                servicioADescontar;
                if (!puedePagarElServicio(servicioADescontar)) {
                    alert("No posee saldo para pagar este servicio.");
                    return;
                }
                restarServicio(servicioADescontar);
                break;
            case "4":
                servicioADescontar;
                if (!puedePagarElServicio(servicioADescontar)) {
                    alert("No posee saldo para pagar este servicio.");
                    return;
                }
                restarServicio(servicioADescontar);
                break;
            default:
                alert("El servicio seleccionado no existe. ");
                return;
        }
        let mensajePagoDeServicio =
            "El saldo de la cuenta era $ " +
            saldoPrimero +
            "\n" + "El monto del servicio que se pago es de $ " +
            servicioADescontar +
            "\n" + "El saldo actual de la cuenta es $ " +
            saldoCuenta;
        alert(mensajePagoDeServicio);
    }
}

function transferirDinero() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;
        
    } else {
        let montoATransferir = prompt("¿Cuál es el monto que desea transferir?");
        let numeroMontoATransferir = parseInt(montoATransferir);
        if (Number.isNaN(numeroMontoATransferir)) {
            return;
        }
        if (montoATransferir == null || montoATransferir == "") {
            return;
        }
        if (numeroMontoATransferir > saldoCuenta) {
            alert(
                "El saldo que tiene en la cuenta es menor al monto que desea transferir"
            );
        } else {
            let cualEsLaCuenta = prompt(
                "Ingrese el numero de cuenta al cual desea transferir: (Utilizar 1234567)"
            );
            switch (cualEsLaCuenta) {
                case "1234567":
                case "7654321":
                    descontarTransferencia(numeroMontoATransferir);
                    let mensajeTransferencia =
                        "El saldo tranferido es de $" +
                        montoATransferir +
                        "\n" + "Se transfirió a la cuenta: " +
                        cualEsLaCuenta;
                    alert(mensajeTransferencia);
                    break;
                default:
                    alert(
                        "El numero de cuenta ingresado no corresponde a ninguna cuenta amiga. "
                    );
            }
        }
    }
}


function crearPlazoFijo() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;
        
    } else {
        alert("La TNA es de 97%");
        let solicitarMontoAInvertir = prompt(
            "Ingrese el monto que quiere poner en el plazo fijo."
        );
        let numeroMontoaInvertir = parseInt(solicitarMontoAInvertir);
        if (Number.isNaN(numeroMontoaInvertir)) {
            return;
        }
        if (solicitarMontoAInvertir == null || solicitarMontoAInvertir == "") {
            return;
        }
        if (numeroMontoaInvertir < saldoCuenta) {
            let diasDelPlazoFijo = prompt(
                "Cantidad de dias a invertir (El plazo minimo es de 30 dias y el máximo es de 365"
            );
            let numeroDiasAInvertir = parseInt(diasDelPlazoFijo);
            if (Number.isNaN(numeroDiasAInvertir)) {
                return;
            }
            if (diasDelPlazoFijo == null || diasDelPlazoFijo == "") {
                return;
            }
            if (numeroDiasAInvertir >= 30 && numeroDiasAInvertir <= 365) {
                let gananciaDeLaInversion =
                    ((0.55 * numeroDiasAInvertir) / 365) * numeroMontoaInvertir;
                let mensajeInversion =
                    "El monto ingresado es de $ " +
                    numeroMontoaInvertir +
                    "\n" + "El plazo elegido es de " +
                    diasDelPlazoFijo +
                    " días" +
                    "\n" + "La ganancia es de aproximadamente $ " +
                    Math.round(gananciaDeLaInversion);
                alert(mensajeInversion);
                saldoCuenta -= numeroMontoaInvertir;
            } else {
                alert("La fecha establecida no esta permitida");
            }
        } else {
            alert("Usted no posee el monto para realizar esta acción.");
        }
    }
}

function generaToken() {
    if (!sesionIniciada) {
        alert("Debes iniciar sesión antes de consultar el saldo.");
        return;
    } else {
        let tokenAleatorio = Math.round(Math.random() * 999999);
        alert("Tu código token es: " + tokenAleatorio);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////FUNCIONES MATEMATICAS////////////////////////////////////

//permite tener abstraccion del dinero que sumo
function sumarDinero(dineroASumar) {
    saldoCuenta += dineroASumar;
}

//permite tener abstraccion del dinero que resto
function restarDinero(dineroARestar) {
    saldoCuenta -= dineroARestar;
}

//consulto que haya salfo en la cuenta, si hay saldo TRUE
function haySaldoEnLaCuenta(numeroDineroAExtraer) {
    if (numeroDineroAExtraer <= saldoCuenta) {
        return true;
    } else {
        return false;
    }
}

//Es una forma de abreviar la funcion en caso de superar el limite
function superaLimiteDeExtraccion(numeroDineroAExtraer) {
    return numeroDineroAExtraer > limiteExtraccion;
}

//genero esta funcion para que el retiro sea siempre multiplo de 100 como en los cajeros.
function esMultiplode100(numeroDineroAExtraer) {
    return numeroDineroAExtraer % 100 == 0;
}

//Al abonar el servicio descuento del total de la cuenta.
function restarServicio(servicioADescontar) {
    saldoCuenta -= servicioADescontar;
}

// verifico que el saldo a abonar sea menor al saldo de la cuenta
function puedePagarElServicio(servicioADescontar) {
    return servicioADescontar < saldoCuenta;
}

// realizo transferencia
function descontarTransferencia(numeroMontoATransferir) {
    saldoCuenta -= numeroMontoATransferir;
}
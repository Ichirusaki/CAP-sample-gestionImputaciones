const cds = require('@sap/cds');

/** Service implementation for ImputacionesService */
module.exports = cds.service.impl(function() {
  this.before(["CREATE", "UPDATE"], "Imputaciones", _comprobarHoras);
  this.after("READ", "Empleados", _nombreCompleto);
});


/** Mostrar error si no ha puesto las horas que toca */
function _comprobarHoras (req) {
    const horas = req.data.horas;

    let message = "";
    if (horas <= 0) {
        message = "Se debe introducir al menos 0.5 horas";
    } else if( horas > 24) {
        message = "Se debe introducir menos de 24 horas";
    } else if (horas % 0.5 != 0) {
        message = "Las horas deben ser múltiplo de 0.5";
    }

    if (message) {
        req.error(409, message);
    }
}

/** Modificar el campo pais para que muestre el nombre en vez del código */
function _nombreCompleto (req) {
    req.forEach(empleado => {
        empleado.nombreCompleto = `${empleado.nombre} ${empleado.apellidos}`;
    });
}
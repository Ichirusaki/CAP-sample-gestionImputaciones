const cds = require('@sap/cds');
const { Imputaciones } = cds.entities;

/** Service implementation for ImputacionesService */
module.exports = cds.service.impl(function () {
    this.on("horasImputadas", _totalHorasEmpleadoDia);
    this.on("horasImputadas2", _totalHorasEmpleadoDia);
});

/** Leer el total de horas de un empleado en un dia */
async function _totalHorasEmpleadoDia(req) {
    const empleado = req.data.empleado;
    const dia = req.data.dia;
 
    const horas = await cds.run(SELECT.from(Imputaciones)
        .columns(["horas"])
        .where({ empleado_usuario: empleado, fecha: dia }));

    if (!horas.length) {
        req.error(`El empleado ${empleado} no tiene imputaciones en el dia ${dia}.`);
    }

    let sumaHoras = 0;
    for (const horaObject of horas) {
        sumaHoras += horaObject.horas;
    }
    return sumaHoras;
}
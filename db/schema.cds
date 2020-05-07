namespace com.sothis.gestionImputaciones;
using { Country, managed, cuid } from '@sap/cds/common';


entity Empleados {
    key usuario : String;
    nombre : String;
    apellidos : String;
    virtual nombreCompleto : String;
    pais : Country;
    imputaciones : Association to many Imputaciones on imputaciones.empleado = $self;
}

entity Imputaciones : managed, cuid {
    empleado: Association to Empleados not null;
    fecha : Date not null;
    horas : Decimal(3, 1) not null;
    observaciones : String(255);
}
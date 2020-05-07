using { com.sothis.gestionImputaciones as gestImp } from '../db/schema';

@path: '/admin'
service AdminService {
    entity Empleados as projection on gestImp.Empleados;
    @readonly entity Imputaciones as projection on gestImp.Imputaciones excluding { createdBy, modifiedAt};
    action horasImputadas(empleado:String,dia:String) returns Decimal(3,1);
    function horasImputadas2(empleado:String,dia:String) returns Decimal(3,1);
}
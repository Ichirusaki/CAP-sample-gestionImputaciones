using { com.sothis.gestionImputaciones as gestImp } from '../db/schema';

@path: '/imputaciones'
service ImputacionesService {
    @readonly entity Empleados as select from gestImp.Empleados excluding { pais } ;
    entity Imputaciones as projection on gestImp.Imputaciones;
}
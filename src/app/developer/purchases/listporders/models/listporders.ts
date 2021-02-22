export class Lordenes {
  constructor(
    public idorden: string,
    public idpersonal_solicita: string,
    public solicita: string,
    public idpersonal_autoriza: string,
    public autoriza: string,
    public idsucursal: string,
    public sucursal: string,
    public orden: string,
    public fecha: string,
    public piezas: string,
    public monto: string,
    public estatus: string,
    public fcreacion: string,
    public fmodificacion: string
  ) { }
}

export class Dordenes {
  constructor(
    public idorden: string,
    public idarticulo: string,
    public codigobarras: string,
    public marca: string,
    public nombre: string,
    public submarca: string,
    public costo: string,
    public cantidad: string,
    public monto: string
  ) { }
}

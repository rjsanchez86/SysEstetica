export class LVentas {
  constructor(
    public idventa: string,
    public idagenda: string,
    public idcliente: string,
    public idsucursal: string,
    public sucursal: string,
    public idmpagos: string,
    public folio: string,
    public subtotal: string,
    public descuentos: string,
    public impuestos: string,
    public mpagos: string,
    public total: string,
    public cliente: string,
    public personal: string,
    public estatus: string,
    public fhentrada: string,
    public fhsalida: string,
  ) { }
}

export class Ventas {
  constructor(
    public idventa: string,
    public idagenda: string,
    public idcliente: string,
    public idsucursal: string,
    public idalmacen: string,
    public idmpagos: string,
    public subtotal: string,
    public descuentos: string,
    public impuestos: string,
    public total: string,
    public cliente: string,
    public estatus: string,
    public fhentrada: string,
    public fhsalida: string,
  ) { }
}

export class Articulo {
  constructor(
    public id: number,
    public idarticulo: string,
    public idcategoria: string,
    public idpersonal: string,
    public idalmacen: string,
    public tipo: string,
    public nombre: string,
    public comision: number,
    public personal: string,
    public codigobarras: string,
    public cantidad: number,
    public cantidadusar: number,
    public importe: number,
    public total: number,
    public fhentrada: string,
    public fhsalida: string,
  ) { }
}

export class Venta {
  constructor(
    public idventa: string,
    public idagenda: string,
    public idcliente: string,
    public idsucursal: string,
    public idmpagos: string,
    public folio: string,
    public subtotal: string,
    public descuentos: string,
    public impuestos: string,
    public total: string,
    public estatus: string,
    public fcreacion: string,
    public cliente: string,
    public mpagos: string,
    public comision: string,
    public precio: string,
    public cantidad: string,
    public nombre: string,
    public personal: string,
    public idventasdet: string,
    public fhentrada: string,
    public fhsalida: string,
  ) { }
}

export class VentaD {
  constructor(
    public nombre: number,
    public cantidad: number,
    public precio: number,
    public idventasdet: number,
  ) { }
}

export class Acceso1 {
  constructor(
    public usuario: string,
    public password: string,
  ) { }
}

export class Merma {
  constructor(
    public id: number,
    public idalmacen: string,
    public almacen: string,
    public idarticulo: string,
    public nombre: string,
    public codigobarras: number,
    public cantidad: number,
    public cantidadusar: number,
  ) { }
}

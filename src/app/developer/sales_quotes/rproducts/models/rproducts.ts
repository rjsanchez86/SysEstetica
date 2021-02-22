export class Sucursal {
  constructor(
    public idsucursal: string,
    public sucursal: string
  ) { }
}

export class Ticket {
  constructor(
    public idventa: string,
    public folio: string
  ) { }
}

export class DTicket {
  constructor(
    public idventa: string,
    public idventas: string,
    public folio: string,
    public codigobarras: string,
    public nombre: string,
    public cantidad: string,
    public cdevolver: string,
    public precio: string,
    public importeiva: string,
    public estatus: string
  ) { }
}


export class Devoluciones {
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

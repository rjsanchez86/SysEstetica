export class Cliente {
  constructor(
    public nombre: string,
    public apaterno: string,
    public amaterno: string,
    public movil: string,
    public correo: string,
  ) { }
}

export class Acceso {
  constructor(
    public usuario: string,
    public password: string,
  ) { }
}

export class Sucursal {
  constructor(
    public idsucursal: string,
    public sucursal: string
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
    public folio: string,
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
    public presentacion: string,
    public cantidad: number,
    public cantidadusar: number,
  ) { }
}

export class Venta {
  constructor(
    public subtotal: string,
    public descuentos: string,
    public impuestos: string,
    public total: string,
    public cliente: string,
    public folio: string,
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

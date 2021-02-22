export class Kardex {
  constructor(
    public idalmacen: string,
    public idproceso: string,
    public idarticulo: string,
    public idproveedor: string,
    public concepto: string,
    public fecha: string,
    public entrada: string,
    public salida: string,
    public cantidad: string,
    public costo: string,
    public tipo: string,
    public folio: string,
    public fcreacion: string,
  ) { }
}

export class Kardex2 {
  constructor(
    public idalmacen: string,
    public idproceso: string,
    public idarticulo: string,
    public idproveedor: string,
    public concepto: string,
    public fecha: string,
    public entrada: string,
    public salida: string,
    public cantidad: string,
    public costo: string,
    public tipo: string,
    public folio: string,
    public fcreacion: string,
  ) { }
}

export class Proceso {
  constructor(
    public idproceso: string,
    public proceso: string
  ) { }
}


export class Sucursal {
  constructor(
    public idsucursal: string,
    public sucursal: string
  ) { }
}

export class Almacen {
  constructor(
    public idalmacen: string,
    public almacen: string,
  ) { }
}

export class Proveedor {
  constructor(
    public idproveedor: string,
    public proveedor: string,
  ) { }
}

export class Articulo{
  constructor(
    public idarticulo: string,
    public idcategoria: string,
    public nombre: string,
    public codigobarras: string,
    public cantidad: number,
    public costo: number
  ) { }
}

export class Sucursal {
  constructor(
    public idsucursal: string,
    public sucursal: string
  ) { }
}

export class Almacen {
  constructor(
    public idalmacen: string,
    public idsucursal: string,
    public almacen: string
  ) { }
}

export class AlmacenM {
  constructor(
    public idalmacen: string,
    public idsucursal: string,
    public almacen: string
  ) { }
}


export class Productos {
  constructor(
    public idproducto: string,
    public nombre: string
  ) { }
}

export class Producto {
  constructor(
    public idproducto: string,
    public codigobarras: string,
    public nombre: string,
    public cantidad: string,
    public presentacion: string,
    public cantpresentacion: string,
  ) { }
}


export class addProducto {
  constructor(
    public idsucursal: string,
    public idalmacen: string,
    public idalmacenm: string,
    public idarticulo: string,
    public cantidad: string,
  ) { }
}

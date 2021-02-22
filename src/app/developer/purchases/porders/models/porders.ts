
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
    public costo: number,
    public cactual: number
  ) { }
}


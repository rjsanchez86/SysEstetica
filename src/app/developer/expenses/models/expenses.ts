export class Sucursal {
  constructor(
    public idsucursal: string,
    public sucursal: string
  ) { }
}

export class CGastos {
  constructor(
    public idcgastos: string,
    public cgastos: string
  ) { }
}
export class TGastos {
  constructor(
    public idtgastos: string,
    public tipo: string
  ) { }
}

export class Gastos {
  constructor(
    public idsucursal: string,
    public sucursal: string,
    public idcgastos: string,
    public cgastos: string,
    public idtgastos: string,
    public tipo: string,
    public monto: string,
    public observaciones: string,
    public estatus: string,
    public fcreacion: string,
  ) { }
}

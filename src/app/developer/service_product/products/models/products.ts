export class Products {
  constructor(
    public idarticulo: string,
    public idcategoria: string,
    public idclasificacion: string,
    public categoria: string,
    public idproveedor: string,
    public proveedor: string,
    public presentacion: string,
    public idmarca: string,
    public marca: string,
    public idsubmarca: string,
    public submarca: string,
    public nombre: string,
    public codigobarras: string,
    public imagen: string,
    public tiempo: string,
    public importe: number,
    public minstock: number,
    public estatus: string,
    public fcreacion: string,
    public fmodificacion: string
  ) { }
}

export class Proveedor {
  constructor(
    public idproveedor: string,
    public proveedor: string,
    public nombrecontacto: string,
    public telefonocontacto: string,
    public direccion: string,
    public ciudad: string,
    public fcreacion: string,
    public fmodificacion: string,
  ) { }
}

export class Marca {
  constructor(
    public idmarca: string,
    public marca: string
  ) { }
}

export class SubMarca {
  constructor(
    public idclmarca: string,
    public idmarca: string,
    public marca: string,
    public idsubmarca: string,
    public submarca: string,
  ) { }
}


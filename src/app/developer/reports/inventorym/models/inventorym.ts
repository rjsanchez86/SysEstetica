export class InventarioM {
  constructor(
    public sucursal: string,
    public almacen: string,
    public codigobarras: string,
    public nombre: string,
    public proveedor: string,
    public marca: string,
    public submarca: string,
    public presentacion: string,
    public cantidad: string,
  ) { }
}

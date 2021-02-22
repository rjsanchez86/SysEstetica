export class Sucursal {
    constructor(
        public idsucursal: string,
        public idempresa: string,
        public empresa: string,
        public sucursal: string,
        public direccion: string,
        public nexterior: string,
        public ninterior: string,
        public colonia: string,
        public municipio: string,
        public estado: string,
        public cpostal: string,
        public logo: string,
        public letrafolio: string,
        public fcreacion: string,
        public fmodificacion: string,
        public estatus: string
    ) { }
}

export class Estatus{
  constructor(
    public estatus: string
 ) { }
}

export class Staff {
    constructor(
       public idpersonal: string,
       public idpuesto: string,
       public puesto: string,
       public nombre: string,
       public apaterno: string,
       public amaterno: string,
       public fnacimiento: string,
       public movil: string,
       public local: string,
       public correo: string,
       public curp: string,
       public rfc: string,
       public color: string,
       public estatus: string,
       public fcreacion: string,
       public fmodificacion: string
    ) { }
}

export class Estatus{
  constructor(
    public estatus: string
 ) { }
}

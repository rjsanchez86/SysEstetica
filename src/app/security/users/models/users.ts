export class Usuarios {
  constructor(
    public idseguridad: string,
    public idpersonal: number,
    public idperfil: number,
    public usuario: string,
    public password: string,
    public password2: string,
    public estatus: string,
    public nombre: string,
    public perfil: string,
    public sucursal: string,
    public facceso: string,
    public fcreacion: string,
    public fmodificacion: string
  ) { }
}

export class Perfil {
  constructor(
    public idperfil: string,
    public perfil: string,
  ) { }
}

export class Personal {
  constructor(
    public idpersonal: string,
    public nombre: string,
  ) { }
}

export class Estatus{
  constructor(
    public estatus: string
 ) { }
}

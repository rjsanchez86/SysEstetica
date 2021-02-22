export class Login {
  constructor(
    public usuario: string,
    public password: string
  ) { }
}

export interface UserInterface {
  id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  puesto?: string;
  permisos?: string;
  sucursal?: string;
}

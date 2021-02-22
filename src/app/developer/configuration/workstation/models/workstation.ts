export class Workstation {
  constructor(
      public idpuesto: string,
      public puesto: string,
      public comision: string,
  ) { }
}

export class Comision {
constructor(
    public idpuesto: string,
    public idclasificacion: string,
    public clasificacion: string,
    public comision: string,
) { }
}

export class Quotes {
    constructor(
        public idcliente: string,
        public idsucursal: string,
        public idpersonal: string,
        public fcita: string,
        public hcita: string,
        public observacion: string,
        public idservicio: string,
    ) { }
}

export class Cliente{
    constructor(
        public nombre: string,
        public apaterno: string,
        public amaterno: string,
        public movil: string,
        public correo: string,
    ) { }
}

export class Agenda{
    constructor(
        public idagenda: string,
        public idpersonal: string,
        public nombre: string,
        public apaterno: string,
        public amaterno: string,
        public correo: string,
        public movil: string,
        public nper: string,
        public pper: string,
        public mper: string,
        public moper: string,
        public coper: string,
        public sucursal: string,
        public servicio: string,
        public fcita: string,
        public hcita: string,
        public estatus: string,
        public observacion: string,
    ) { }
}

export class Cancelar{
    constructor(
        public idagenda: string,
        public estatus: string,
        public observacion: string,
    ) { }
}

export class ListQuotes {
    constructor(
        public idagenda: string,
        public idcliente: string,
        public idpersonal: string,
        public idsucursal: string,
        public fcita: string,
        public hcita: string,
        public estatus: string,
        public observacion: string,
        public cliente: string,
        public personal: string,
        public sucursal: string,
        public servicio: string,
    ) { }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlService {

  constructor() { }

  ObtenetURL() {
    /*console.log("hostname: " + window.location.hostname);
    console.log('pathname: '+window.location.pathname);
    console.log('href: '+window.location.href);
    console.log('host: '+window.location.host);
    console.log('protocol: '+window.location.protocol);*/
    let baseUrl: string;
    /*Obtiene el hostname para poder acceder a api de slim */
    switch (window.location.hostname) {
      case 'localhost':
        baseUrl = 'http://localhost/sysesteticaback/public/api/';
        break;
      case 'sistemasmoabu.com':
        baseUrl = 'http://sistemasmoabu.com/SysEsteticaBack/public/api/';
        break;
      case 'sisestetica.lauracardona.com.mx':
        baseUrl = 'http://sisestetica.lauracardona.com.mx/sisesteticaback/public/api/';
        break;
      default:
        break;
    }
    return baseUrl;
  }
}

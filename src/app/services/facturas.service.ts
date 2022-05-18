import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serialize } from 'object-to-formdata';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  url = "http://localhost:8080/Papeleria/Facturas/";

  constructor(private http:HttpClient) { }

  getFacturas(){
    return this.http.get(`${this.url}getFacturas.php`)
  }

  setFactura(factura:any){
    const FACTURA_FD = serialize(factura);
    return this.http.post(`${this.url}crearFactura.php`, FACTURA_FD).pipe(retry(3))
  }
}

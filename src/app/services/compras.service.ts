import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serialize } from 'object-to-formdata';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  url = "http://localhost:8080/Papeleria/Compras/";

  constructor(private http:HttpClient) { }

  setCompra(compra:any){
    const COMPRA_FD = serialize(compra);
    return this.http.post(`${this.url}crearCompra.php`, COMPRA_FD).pipe(retry(3))
  }

  getCompras(){
    return this.http.get(`${this.url}getCompras.php`)
  }

}

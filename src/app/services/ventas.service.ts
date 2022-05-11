import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serialize } from 'object-to-formdata';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  url = "http://localhost:8080/Papeleria/Ventas/";

  constructor(private http:HttpClient) { }

  setVenta(venta:any){
    const VENTA_FD = serialize(venta);
    return this.http.post(`${this.url}crearVenta.php`, VENTA_FD).pipe(retry(3))
  }

  getVentas(){
    return this.http.get(`${this.url}getVentas.php`)
  }

  // getVenta(id:number){
  //   return this.http.get(`${this.url}getProveedor.php?id_proveedor=${id}`)
  // }
}

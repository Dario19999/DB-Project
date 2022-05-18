import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serialize } from 'object-to-formdata';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  url = "http://localhost:8080/Papeleria/Proveedores/";

  constructor(private http:HttpClient) { }

  setProveedor(proveedor:any){
    const PROVEEDOR_FD = serialize(proveedor);
    return this.http.post(`${this.url}crearProveedor.php`, PROVEEDOR_FD).pipe(retry(3))
  }

  getProveedores(){
    return this.http.get(`${this.url}getProveedores.php`)
  }

  getProveedor(id:number){
    return this.http.get(`${this.url}getProveedor.php?id_proveedor=${id}`)
  }

  deleteProveedor(id:number){
    return this.http.get(`${this.url}deleteProveedor.php?id=${id}`);
  }
}

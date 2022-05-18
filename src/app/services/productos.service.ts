import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serialize } from 'object-to-formdata';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url = "http://localhost:8080/Papeleria/Productos/";

  constructor(private http:HttpClient) { }

  setProducto(producto:any){
    const PRODUCTO_FD = serialize(producto);
    return this.http.post(`${this.url}crearProducto.php`, PRODUCTO_FD).pipe(retry(3))
  }

  getProductos(){
    return this.http.get(`${this.url}getProductos.php`)
  }

  deleteProducto(id:number){
    return this.http.get(`${this.url}deleteProducto.php?id=${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { serialize } from 'object-to-formdata';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  url = "http://localhost:8080/Papeleria/Empleados/";

  constructor(private http:HttpClient) { }

  setEmpleado(empleado:any){
    const EMPLEADO_FD = serialize(empleado);
    return this.http.post(`${this.url}crearEmpleado.php`, EMPLEADO_FD).pipe(retry(3))
  }

  getEmpleados(){
    return this.http.get(`${this.url}getEmpleados.php`)
  }

  getEmpleado(id:number){
    return this.http.get(`${this.url}getEmpleado.php?id=${id}`)
  }

  deleteEmpleado(id:number){
    return this.http.get(`${this.url}deleteEmpleado.php?id=${id}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  formProveedores:FormGroup
  formEditProveedores:FormGroup

  proveedores:any = null;
  proveedor:any = null;

  constructor(private fb:FormBuilder,
              private proveedoresService: ProveedoresService) { }

  ngOnInit(): void {
    this.formInit();
    this.getProveedores();
  }

  formInit(){
    this.formProveedores = this.fb.group({
      id:[''],
      contacto:[''],
      direccion:[''],
      denominacion:[''],
      telefono:['']
    });
    this.formEditProveedores = this.fb.group({
      id:[''],
      contacto:[''],
      direccion:[''],
      denominacion:[''],
      telefono:['']
    })
  }

  getProveedores(){
    this.proveedoresService.getProveedores().subscribe(resultado => {
      this.proveedores = resultado
      console.log(this.proveedores);
    });
  }

  guardarProveedor(){
    this.proveedoresService.setProveedor(this.formProveedores.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        this.getProveedores();
        this.formProveedores.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe un proveedor con este ID");
      }
    });
  }

  eliminarProveedor(id:number){
    console.log(id);
    if (confirm("¿Desea eliminar este registro?")){
      this.proveedoresService.deleteProveedor(id).subscribe((datos:any) => {
        console.log(datos);
        if (datos['resultado'] == 'OK') {
          this.getProveedores();
          return;
        }
        else{
          if(datos['error'] == '23503'){
            console.log('a');
            alert("No puede eliminar al proveedor debido a que está registrado en una compra");
          }
        }
      });
    }
  }

  getProveedor(id:any){
    console.log(id);
    this.proveedoresService.getProveedor(id).subscribe(resultado => {
      this.proveedor = resultado
      console.log(this.proveedor);
      this.formEditProveedores.setValue({
        id:this.proveedor[0].id_proveedor,
        contacto:this.proveedor[0].contacto,
        denominacion:this.proveedor[0].denominacion,
        direccion:this.proveedor[0].direccion,
        telefono:this.proveedor[0].telefono,
      });
    });
  }

  editarProveedor(id_proveedor:number){
    this.getProveedor(id_proveedor);
  }

  guardarEdicion(){
    console.log(this.formEditProveedores.value);
    this.proveedoresService.updateProveedor(this.formEditProveedores.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado']);
        this.getProveedores();
        this.formEditProveedores.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe un empleado con este ID");
      }
    });
  }
}

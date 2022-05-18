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

  proveedores:any = null;

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

  editarProveedor(id:number){

  }

}

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

  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComprasService } from '../../services/compras.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { ProductosService } from '../../services/productos.service';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  formCompras: FormGroup;

  compras:any = null;
  empleados:any = null;
  proveedores:any = null;
  productos:any = null;

  constructor(private fb:FormBuilder,
              private comprasService:ComprasService,
              private proveedoresService:ProveedoresService,
              private productosService:ProductosService,
              private empleadosService:EmpleadosService) { }

  ngOnInit(): void {
    this.formInit();
    this.getCompras();
    this.getEmpleados();
    this.getProductos();
    this.getProveedores();
  }

  formInit(){
    this.formCompras = this.fb.group({
      id:[''],
      producto:[''],
      cantidad:[''],
      total:[''],
      comprador:[''],
      proveedor:[''],
      fecha:['']
    })
  }

  getCompras(){
    this.comprasService.getCompras().subscribe(resultado => {
      this.compras = resultado
      console.log(this.compras);
    });
  }

  getEmpleados(){
    this.empleadosService.getEmpleados().subscribe(resultado => {
      this.empleados = resultado
      console.log(this.empleados);
    });
  }

  getProductos(){
    this.productosService.getProductos().subscribe(resultado => {
      this.productos = resultado
      console.log(this.productos);
    });
  }

  getProveedores(){
    this.proveedoresService.getProveedores().subscribe(resultado => {
      this.proveedores = resultado
      console.log(this.proveedores);
    });
  }

  guardarCompra(){
    console.log(this.formCompras.value);
    this.comprasService.setCompra(this.formCompras.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        this.getCompras();
        this.formCompras.reset();
      }
    });
  }
}

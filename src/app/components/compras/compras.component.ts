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
  formEditCompras: FormGroup;

  compras:any = null;
  info:any = null;
  compra:any = {};
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
    });
    this.formEditCompras = this.fb.group({
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
    });
  }

  getCompra(id:any){
    console.log(id);
    this.comprasService.getCompra(id).subscribe(resultado => {
      this.compra = resultado
      console.log(this.compra);
      this.formEditCompras.setValue({
        id:this.compra[0].id_compra,
        producto:this.compra[0].producto,
        cantidad:this.compra[0].cantidad,
        total:this.compra[0].total_compra,
        proveedor:this.compra[0].proveedor,
        comprador:this.compra[0].comprador,
        fecha:this.compra[0].fecha_compra
      });
    });
  }

  getEmpleados(){
    this.empleadosService.getEmpleados().subscribe(resultado => {
      this.empleados = resultado
    });
  }

  getProductos(){
    this.productosService.getProductos().subscribe(resultado => {
      this.productos = resultado
    });
  }

  getProveedores(){
    this.proveedoresService.getProveedores().subscribe(resultado => {
      this.proveedores = resultado
    });
  }

  guardarCompra(){
    console.log(this.formCompras.value);
    this.comprasService.setCompra(this.formCompras.value).subscribe((datos:any) =>{
      console.log(datos);
      if (datos['resultado'] == 'OK') {
        this.getCompras();
        this.formCompras.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe una compra con este ID");
      }
    });
  }

  editarCompra(id_compra:number){
    this.getCompra(id_compra);
  }

  guardarEdicion(){
    console.log(this.formEditCompras.value);
    this.comprasService.updateCompra(this.formEditCompras.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado']);
        this.getCompras();
        this.formEditCompras.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe un empleado con este ID");
      }
    });
  }

  eliminarCompra(id:number){
    console.log(id);
    if (confirm("¿Desea eliminar este registro?")){
      this.comprasService.deleteCompra(id).subscribe((datos:any) => {
        if (datos['resultado'] == 'OK') {
          this.getCompras();
          return;
        }
        alert("Error al eliminar.")
      });
    }
  }

}

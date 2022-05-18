import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  formProductos: FormGroup;
  formEditProductos: FormGroup;

  productos:any = null;
  producto:any = null;
  proveedores:any = null;

  constructor(private fb: FormBuilder,
              private productosService: ProductosService,
              private proveedoresService: ProveedoresService) { }

  ngOnInit(): void {
    this.formInit();
    this.getProductos();
    console.log(this.productos);
    this.getProveedores();
  }

  formInit(){
    this.formProductos = this.fb.group({
      id:[''],
      nombre:[''],
      desc:[''],
      precio:[''],
      precioVenta:[''],
      stock:[''],
      proveedor:['']
    });
    this.formEditProductos = this.fb.group({
      id:[''],
      nombre:[''],
      desc:[''],
      precio:[''],
      precioVenta:[''],
      stock:[''],
      proveedor:['']
    });
  }

  getProductos(){
    this.productosService.getProductos().subscribe(resultado => {
      this.productos = resultado
      for (const [i, producto] of this.productos.entries()){
        this.proveedoresService.getProveedor(producto.id_proveedor).subscribe((res:any) => {
          this.productos[i]['nombre_proveedor'] = res[0].denominacion
        });
      }
      console.log(this.productos);
    });
  }

  getProveedores(){
    this.proveedoresService.getProveedores().subscribe(resultado => {
      this.proveedores = resultado
      console.log(this.proveedores);
    });
  }

  guardarProducto(){
    this.productosService.setProducto(this.formProductos.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        this.getProductos();
        this.formProductos.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe una compra con este ID");
      }
    });
  }

  getProducto(id:any){
    this.productosService.getProducto(id).subscribe(resultado => {
      this.producto = resultado
      console.log(this.producto);
      this.formEditProductos.setValue({
        id:this.producto[0].id_producto,
        nombre:this.producto[0].nombre,
        desc:this.producto[0].descripcion,
        precio:this.producto[0].precio,
        precioVenta:this.producto[0].precio_venta,
        stock:this.producto[0].id_producto,
        proveedor:this.producto[0].id_proveedor
      });
    });
  }

  guardarEdicion(){
    console.log(this.formEditProductos.value);
    this.productosService.updateProducto(this.formEditProductos.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado']);
        this.getProductos();
        this.formEditProductos.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe un empleado con este ID");
      }
    });
  }

  editarProducto(id:number){
    this.getProducto(id);
  }

  eliminarProducto(id:number){
    console.log(id);
    if (confirm("¿Desea eliminar este registro?")){
      this.productosService.deleteProducto(id).subscribe((datos:any) => {
        console.log(datos);
        if (datos['resultado'] == 'OK') {
          this.getProductos();
          return;
        }
        else{
          if(datos['error'] == '23503'){
            console.log('a');
            alert("No puede eliminar el producto debido a que está registrado en una venta o compra");
          }
        }
      });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VentasService } from '../../services/ventas.service';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  formVentas: FormGroup;
  formEditVentas: FormGroup;

  ventas:any = null;
  venta:any = null;

  empleados:any = null;

  constructor(private fb:FormBuilder,
              private ventasService:VentasService,
              private empleadosService:EmpleadosService) { }

  ngOnInit(): void {
    this.formInit();
    this.getVentas();
    this.getEmpleados();
  }

  formInit(){
    this.formVentas = this.fb.group({
      id:[''],
      vendedor:[''],
      total:[''],
      fecha:[''],
      metodoPago:['']
    });
    this.formEditVentas = this.fb.group({
      id:[''],
      vendedor:[''],
      total:[''],
      fecha:[''],
      metodoPago:['']
    })
  }

  getVentas(){
    this.ventasService.getVentas().subscribe(resultado => {
      this.ventas = resultado
      console.log(this.ventas);
    });
  }

  getEmpleados(){
    this.empleadosService.getEmpleados().subscribe(resultado => {
      this.empleados = resultado
      console.log(this.empleados);
    });
  }

  guardarVenta(){
    console.log(this.formVentas.value);
    this.ventasService.setVenta(this.formVentas.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        this.getVentas();
        this.formVentas.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe una venta con este ID");
      }
    });
  }

  eliminarVenta(id:number){
    console.log(id);
    if (confirm("¿Desea eliminar este registro?")){
      this.ventasService.deleteVenta(id).subscribe((datos:any) => {
        if (datos['resultado'] == 'OK') {
          this.getVentas();
          return;
        }
        alert("Error al eliminar.")
      });
    }
  }

  getVenta(id:any){
    this.ventasService.getVenta(id).subscribe(resultado => {
      this.venta = resultado
      console.log(this.venta);
      this.formEditVentas.setValue({
        id:this.venta[0].id_venta,
        vendedor:this.venta[0].vendedor,
        total:this.venta[0].total_venta,
        fecha:this.venta[0].fecha_venta,
        metodoPago:this.venta[0].metodo_pago
      });
    });
  }

  guardarEdicion(){
    console.log(this.formEditVentas.value);
    this.ventasService.updateVenta(this.formEditVentas.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado']);
        this.getVentas();
        this.formEditVentas.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe un empleado con este ID");
      }
    });
  }

  editarVenta(id:number){
    this.getVenta(id);
  }

}

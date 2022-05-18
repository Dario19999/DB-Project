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

  ventas:any = null;
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

  editarVenta(id:number){

  }
}

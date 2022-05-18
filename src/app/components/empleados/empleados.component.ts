import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadosService } from '../../services/empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  formEmpleados: FormGroup;
  formEditEmpleados: FormGroup;

  empleados:any = null;
  empleado:any = null;
  form:any = null;

  constructor(private fb: FormBuilder,
              private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.formInit();
    this.getEmpleados();
  }

  formInit(){
    this.formEmpleados = this.fb.group({
      id:[''],
      nombre:[''],
      rfcEmpleado:[''],
      direccionEmpleado:[''],
      sexoEmpleado:[''],
      estatusEmpleado:[''],
      cargoEmpleado:['']
    });
    this.formEditEmpleados = this.fb.group({
      id:[''],
      nombre:[''],
      rfcEmpleado:[''],
      direccionEmpleado:[''],
      sexoEmpleado:[''],
      estatusEmpleado:[''],
      cargoEmpleado:['']
    });
  }

  getEmpleados(){
    this.empleadosService.getEmpleados().subscribe(resultado => {
      this.empleados = resultado
    });
  }

  getEmpleado(id:any){
    this.empleadosService.getEmpleado(id).subscribe(resultado => {
      this.empleado = resultado
      console.log(this.empleado);
      this.formEditEmpleados.setValue({
        id:this.empleado[0].id_empleado,
        nombre:this.empleado[0].nombre,
        rfcEmpleado:this.empleado[0].rfc,
        direccionEmpleado:this.empleado[0].direccion,
        sexoEmpleado:this.empleado[0].sexo,
        estatusEmpleado:this.empleado[0].estatus,
        cargoEmpleado:this.empleado[0].cargo
      });
    });
  }

  guardarEmpleado(){
    this.empleadosService.setEmpleado(this.formEmpleados.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        this.getEmpleados();
        this.formEmpleados.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe un empleado con este ID");
      }
    });
  }

  guardarEdicion(){
    console.log(this.formEditEmpleados.value);
    this.empleadosService.updateEmpleado(this.formEditEmpleados.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado']);
        this.getEmpleados();
        this.formEditEmpleados.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe un empleado con este ID");
      }
    });
  }

  editarEmpleado(id:number){
    this.getEmpleado(id);
  }

  eliminarEmpleado(id:number){
    console.log(id);
    if (confirm("¿Desea eliminar este registro?")){
      this.empleadosService.deleteEmpleado(id).subscribe((datos:any) => {
        console.log(datos);
        if (datos['resultado'] == 'OK') {
          this.getEmpleados();
          return;
        }
        else{
          if(datos['error'] == '23503'){
            console.log('a');
            alert("No puede eliminar al empleado debido a que este registró una venta o una compra");
          }
        }
      });
    }
  }



}

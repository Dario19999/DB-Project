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

  empleados:any = null;

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
    })
  }

  getEmpleados(){
    this.empleadosService.getEmpleados().subscribe(resultado => {
      this.empleados = resultado
      console.log(this.empleados);
    });
  }

  guardarEmpleado(){
    // console.log(this.formEmpleados.value);
    this.empleadosService.setEmpleado(this.formEmpleados.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        this.getEmpleados();
        this.formEmpleados.reset();
      }
    });
  }

}

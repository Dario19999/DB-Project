import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FacturasService } from '../../services/facturas.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {

  formFacturas:FormGroup;
  formEditFacturas:FormGroup;

  facturas:any = null;
  factura:any = null;

  constructor(private fb:FormBuilder,
              private facturasService:FacturasService) { }

  ngOnInit(): void {
    this.formInit();
    this.getFacturas();
  }

  formInit(){
    this.formFacturas = this.fb.group({
      id:[''],
      nota:[''],
      rfc:[''],
      fecha:[''],
      iva:['']
    });
    this.formEditFacturas = this.fb.group({
      id:[''],
      nota:[''],
      rfc:[''],
      fecha:[''],
      iva:['']
    })
  }

  getFacturas(){
    this.facturasService.getFacturas().subscribe(resultado => {
      this.facturas = resultado;
    });
  }

  getFactura(id:number){
    this.facturasService.getFactura(id).subscribe(resultado => {
      this.factura = resultado;
      this.formEditFacturas.setValue({
        id:this.factura[0].id_factura,
        nota:this.factura[0].nota,
        fecha:this.factura[0].fecha_fac,
        rfc:this.factura[0].rfc,
        iva:this.factura[0].iva
      });
    });
  }

  editarFactura(id:number){
    this.getFactura(id);
  }

  guardarEdicion(){
    console.log(this.formEditFacturas.value);
    this.facturasService.updateFactura(this.formEditFacturas.value).subscribe((datos:any) =>{
      if (datos['resultado'] == 'OK') {
        console.log(datos['resultado']);
        this.getFacturas();
        this.formEditFacturas.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe una factura con este ID");
      }
    });
  }

  guardarFactura(){
    console.log(this.formFacturas.value);
    this.facturasService.setFactura(this.formFacturas.value).subscribe((datos:any) =>{
      console.log(datos);
      if (datos['resultado'] == 'OK') {
        this.getFacturas();
        this.formFacturas.reset();
        return;
      }
      if(datos['estatus'] == '1'){
        alert("Ya existe una factura con este ID");
      }
    });
  }

}

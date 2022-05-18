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
  facturas:any = null;

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
    })
  }

  getFacturas(){
    this.facturasService.getFacturas().subscribe(resultado => {
      this.facturas = resultado;
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpleadosService } from './services/empleados.service';
import { HttpClientModule } from '@angular/common/http';
import { FacturasComponent } from './components/facturas/facturas.component';

@NgModule({
  declarations: [
    AppComponent,
    InventarioComponent,
    VentasComponent,
    ProveedoresComponent,
    NavbarComponent,
    EmpleadosComponent,
    ComprasComponent,
    FacturasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [EmpleadosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

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

@NgModule({
  declarations: [
    AppComponent,
    InventarioComponent,
    VentasComponent,
    ProveedoresComponent,
    NavbarComponent,
    EmpleadosComponent,
    ComprasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioComponent } from './components/inventario/inventario.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { EmpleadosComponent } from './components/empleados/empleados.component';
import { ComprasComponent } from './components/compras/compras.component';

const routes: Routes = [
  {path: 'inventario', component: InventarioComponent},
  {path: 'facturas', component: FacturasComponent},
  {path: 'ventas', component: VentasComponent},
  {path: 'proveedores', component: ProveedoresComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'compras', component: ComprasComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inventario' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

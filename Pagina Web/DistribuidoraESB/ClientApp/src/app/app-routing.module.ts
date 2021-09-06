import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ESB/login/login.component';
import { RegistroComponent } from './ESB/registro/registro.component';
import { PerfilComponent } from './ESB/perfil/perfil.component';
import { CarritoComponent } from './ESB/carrito/carrito.component';
import { PerfilClienteComponent } from './ESB/perfil-cliente/perfil-cliente.component';
import { PrincipalComponent } from './principal/principal.component';
import { AuthGuard } from './services/auth.guard';
import {AuthPerfilClienteGuard} from './services/auth-perfil-cliente.guard';
import {AuthPerfilAdminGuard} from './services/auth-perfil-admin.guard';

const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: 'Registro', component: RegistroComponent },
  { path: 'Perfil', component: PerfilComponent, canActivate: [AuthPerfilAdminGuard]},
  { path: 'Carrito', component: CarritoComponent, canActivate: [AuthPerfilClienteGuard]},
  { path: 'PerfilCliente', component: PerfilClienteComponent, canActivate: [AuthPerfilClienteGuard]},
  { path: 'Principal', component: PrincipalComponent }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

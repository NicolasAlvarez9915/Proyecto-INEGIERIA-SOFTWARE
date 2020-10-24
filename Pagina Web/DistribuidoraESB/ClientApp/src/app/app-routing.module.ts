import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ESB/login/login.component';
import { RegistroComponent } from './ESB/registro/registro.component';
import { PerfilComponent } from './ESB/perfil/perfil.component';
import { CarritoComponent } from './ESB/carrito/carrito.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Registro', component: RegistroComponent },
  { path: 'Perfil', component: PerfilComponent },
  { path: 'Carrito', component: CarritoComponent }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
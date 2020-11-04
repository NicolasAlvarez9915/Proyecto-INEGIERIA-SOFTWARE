import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './ESB/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroComponent } from './ESB/registro/registro.component';
import { PerfilComponent } from './ESB/perfil/perfil.component';
import { CarritoComponent } from './ESB/carrito/carrito.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    CarritoComponent,
    FooterComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: PrincipalComponent, pathMatch: 'full' }
    ]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

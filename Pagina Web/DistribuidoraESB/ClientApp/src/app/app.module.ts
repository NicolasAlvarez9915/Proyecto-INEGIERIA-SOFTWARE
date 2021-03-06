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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from './@base/alert-modal/alert-modal.component';
import { FiltroPersonaPipe } from './pipe/filtro-persona.pipe';
import { FiltroClientePipe } from './pipe/filtro-cliente.pipe';
import { ModalDecicionComponent } from './@base/modal-decicion/modal-decicion.component';
import { FiltroProductoPipe } from './pipe/filtro-producto.pipe';
import { FiltroPedidoPipe } from './pipe/filtro-pedido.pipe';
import { PerfilClienteComponent } from './ESB/perfil-cliente/perfil-cliente.component';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    PrincipalComponent,
    LoginComponent,
    RegistroComponent,
    PerfilComponent,
    CarritoComponent,
    FooterComponent,
    AlertModalComponent,
    FiltroPersonaPipe,
    FiltroClientePipe,
    ModalDecicionComponent,
    FiltroProductoPipe,
    FiltroPedidoPipe,
    PerfilClienteComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
    { path: '', component: PrincipalComponent, pathMatch: 'full' }
], { relativeLinkResolution: 'legacy' }),
    AppRoutingModule,
    NgbModule
  ],
  entryComponents:[AlertModalComponent,ModalDecicionComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

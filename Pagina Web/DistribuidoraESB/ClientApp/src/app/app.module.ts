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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './compartido/AngularMaterial/angular-material.module';
import { ModalInfoComponent } from './compartido/componentes/modal-info/modal-info.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import { ProductoComponent } from './principal/componentes/producto/producto.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import { FiltroDomicliarioPipe } from './pipe/filtro-domicliario.pipe';

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
    PerfilClienteComponent,
    ModalInfoComponent,
    ProductoComponent,
    FiltroDomicliarioPipe
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: PrincipalComponent, pathMatch: 'full'}
    ], {relativeLinkResolution: 'legacy'}),
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatTooltipModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatStepperModule
  ],
  entryComponents:[AlertModalComponent,ModalDecicionComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }

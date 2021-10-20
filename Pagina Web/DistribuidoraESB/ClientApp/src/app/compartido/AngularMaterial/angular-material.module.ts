import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDesicionComponent } from '../componentes/modal-desicion/modal-desicion.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from '../../app-routing.module';
import {RouterModule} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ModalDesicionComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatMenuModule,
    MatButtonModule,
    AppRoutingModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class AngularMaterialModule { }

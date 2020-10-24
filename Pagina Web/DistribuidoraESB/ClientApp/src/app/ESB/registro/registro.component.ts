import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private router: Router) { }

  Permitir: boolean;
  ngOnInit(): void {
  }

  Registrar(){
    this.router.navigate(['/Perfil']);
  }
}

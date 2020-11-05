import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Cliente } from '../Models/cliente';
import { Usuario } from '../Models/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  cliente: Cliente;
  usuario: Usuario;

  formularioRegistro: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private modalService: NgbModal,
    ) { }

  Permitir: boolean;
  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm()
  {
    this.cliente = new Cliente();
    this.cliente.apellidos = '';
    this.cliente.direccion = '';
    this.cliente.horaio = '';
    this.cliente.identificacion = '';
    this.cliente.nombres = '';
    this.cliente.telefono = '';
    this.cliente.tipoCliente = '';
    this.cliente.whatsapp = '';
    var contrasena: string = '';
    var contrasenaConfirmar: string = '';
    var correo: string = '';
    this.formularioRegistro = this.formBuilder.group({
      apellidos: [this.cliente.apellidos, Validators.required],
      nombres: [this.cliente.nombres, Validators.required],
      direccion: [this.cliente.direccion, Validators.required],
      horario: [this.cliente.horaio, Validators.required],
      identificacion: [this.cliente.identificacion, Validators.required],
      telefono: [this.cliente.telefono, Validators.required],
      whatsapp: [this.cliente.whatsapp, Validators.required],
      tipoCliente: [this.cliente.tipoCliente, Validators.required],
      contrasena: [contrasena, Validators.required],
      contrasenaConfirmar: [contrasenaConfirmar, Validators.required],
      correo: [correo, Validators.required]
    });
  }

  get control() 
  {
    return this.formularioRegistro.controls;
  }

  onSubmit() {
     if (this.formularioRegistro.invalid) {
      return;
     }
    this.Registrar();
  }

  Registrar(){
    this.router.navigate(['/Perfil']);
  }
}

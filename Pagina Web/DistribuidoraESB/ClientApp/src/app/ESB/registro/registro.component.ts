import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
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

    this.cliente = this.formularioRegistro.value;
    this.usuario.contraseña = this.formularioRegistro.value.contrasenaConfirmar;
    this.usuario.correo = this.formularioRegistro.value.correo;
    this.usuario.idPersona = this.cliente.identificacion;
    this.usuario.rol = 'Cliente';
    if(this.formularioRegistro.value.contrasenaconfirmar != this.formularioRegistro.value.contrasena )
    {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "ALERTA";
      messageBox.componentInstance.message = "Las contraseñas no coninciden";

    }else
    {
      this.clienteService.buscar(this.cliente.identificacion).subscribe(
        r =>
        {
          if(r!=null)
          {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "ALERTA";
            messageBox.componentInstance.message = "Ya existe un cliente registrado con esta identificacion";
          }else
          {
            this.usuarioService.validarSession(this.usuario.correo).subscribe(r=>
              {
                if(r != null )
                {
                  const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "ALERTA";
            messageBox.componentInstance.message = "Ya existe un cliente registrado con este correo";
                }else{
                  this.clienteService.post(this.cliente).subscribe
            (
              r =>
              {
                this.usuarioService.post(this.usuario).subscribe(
                  r=>{
                    if(r!=null)
                    {
                      const messageBox = this.modalService.open(AlertModalComponent)
                      messageBox.componentInstance.title = "BIEN HECHO.";
                      messageBox.componentInstance.message = "Cliente registrado. Cuenta de cliente creada.";
                      this.usuarioService.GuardarUsuarioSesion(this.usuario);
                      this.router.navigate(['/Perfil']);
                    }
                  }
                )
              }
            );
                }
              })
  
          }
        }
      );
    }
    
  }
}

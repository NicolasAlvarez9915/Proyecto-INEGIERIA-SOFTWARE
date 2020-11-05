import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { AdministradorService } from 'src/app/services/administrador.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Administrador } from '../Models/administrador';
import { Cliente } from '../Models/cliente';
import { Usuario } from '../Models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formularioRegistroCliente: FormGroup;

  usuario: Usuario;
  administrador: Administrador;
  administradorActualizar: Administrador;
  contrasenaActualizar: string;
  contrasenaconfirmar: string;
  clienteRegistrar: Cliente;
  usuarioRegistrar: Usuario;
  listaClientes: Cliente[];
  filtroClientes: string;
  i: number;
  existe: Boolean;
  Rol: string;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private administradorService: AdministradorService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
    ) { 
      this.administradorActualizar = new Administrador();
    }

  ngOnInit(): void {
    this.administrador = new Administrador();
    this.validarRol();
  }




  validarRol(){
    this.usuario = this.usuarioService.UsuarioLogueado();
    if(this.usuario == null){
      this.router.navigate(['/Login']);
    }
    document.getElementById("BtnLogin").innerHTML = "lOG OUT";
    document.getElementById("BtnRegistrar").classList.add("Ocultar");
    document.getElementById("BtnRegistrar").classList.remove("Mostrar");
    this.Rol = this.usuario.rol;
    switch (this.Rol){
      case "Cliente":
        document.getElementById("formularioCliente").classList.add("Mostrar");
        document.getElementById("BarraCliente").classList.add("Mostrar");
        document.getElementById("BarraDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioAdministrador").classList.add("Ocultar");
        document.getElementById("BarraAdministrador").classList.add("Ocultar");
      break;
      case "Domiciliario":
        document.getElementById("formularioCliente").classList.add("Ocultar");
        document.getElementById("BarraCliente").classList.add("Ocultar");
        document.getElementById("BarraDomiciliario").classList.add("Mostrar");
        document.getElementById("formularioDomiciliario").classList.add("Mostrar");
        document.getElementById("formularioAdministrador").classList.add("Ocultar");
        document.getElementById("BarraAdministrador").classList.add("Ocultar");
      break;
      case "Administrador":
        document.getElementById("formularioCliente").classList.add("Ocultar");
        document.getElementById("BarraCliente").classList.add("Ocultar");
        document.getElementById("BarraDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioDomiciliario").classList.add("Ocultar");
        document.getElementById("formularioAdministrador").classList.add("Mostrar");
        document.getElementById("BarraAdministrador").classList.add("Mostrar");
        
        this.pedirInforAdministrador();
        this.buildForm();
        this.clientes();
      break;
    }
  }

  clientes()
  {
    this.clienteService.Todos().subscribe
    (
      r =>
      {
        this.listaClientes = r;
      }
    )
  }
    
  private buildForm()
  {
    this.clienteRegistrar = new Cliente();
    this.clienteRegistrar.apellidos = '';
    this.clienteRegistrar.identificacion = '';
    this.clienteRegistrar.nombres = '';
    this.clienteRegistrar.tipoCliente = '';
    var contrasena: string = '';
    this.contrasenaconfirmar = '';
    var correo: string = '';
    this.formularioRegistroCliente = this.formBuilder.group({
      identificacion: [this.clienteRegistrar.identificacion, Validators.required],
      nombres: [this.clienteRegistrar.nombres, Validators.required],
      apellidos: [this.clienteRegistrar.apellidos, [Validators.required]],
      tipoCliente: [this.clienteRegistrar.tipoCliente, Validators.required],
      contrasena: [contrasena, Validators.required],
      contrasenaconfirmar: [this.contrasenaconfirmar, [Validators.required]],
      correo: [correo, Validators.required]
    });
  }

  get control() 
  {
    return this.formularioRegistroCliente.controls;
  }

  
  vercliente(cliente: Cliente)
  {
    const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "ALERTA";
      messageBox.componentInstance.message = cliente.identificacion + ' '+ cliente.nombres;
  }

  onSubmit() {
        if (this.formularioRegistroCliente.invalid) {
          return;
        }
        this.registrarCliente();
  }

  registrarCliente()
  {
    this.clienteRegistrar = this.formularioRegistroCliente.value;
    this.usuarioRegistrar = new Usuario();
    this.usuarioRegistrar.contraseña = this.formularioRegistroCliente.value.contrasena;
    this.usuarioRegistrar.correo = this.formularioRegistroCliente.value.correo;
    this.usuarioRegistrar.rol = "Cliente";
    this.usuarioRegistrar.idPersona = this.clienteRegistrar.identificacion;
    if(this.formularioRegistroCliente.value.contrasenaconfirmar != this.formularioRegistroCliente.value.contrasena )
    {
      const messageBox = this.modalService.open(AlertModalComponent)
      messageBox.componentInstance.title = "ALERTA";
      messageBox.componentInstance.message = "Las contraseñas no coninciden";

    }else
    {
      this.clienteService.buscar(this.clienteRegistrar.identificacion).subscribe(
        r =>
        {
          if(r!=null)
          {
            const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "ALERTA";
            messageBox.componentInstance.message = "Ya existe un cliente registrado con esta identificacion";
          }else
          {
            this.usuarioService.validarSession(this.usuarioRegistrar.correo).subscribe(r=>
              {
                if(r != null )
                {
                  const messageBox = this.modalService.open(AlertModalComponent)
            messageBox.componentInstance.title = "ALERTA";
            messageBox.componentInstance.message = "Ya existe un cliente registrado con este correo";
                }else{
                  this.clienteService.post(this.clienteRegistrar).subscribe
            (
              r =>
              {
                
                this.usuarioService.post(this.usuarioRegistrar).subscribe(
                  r=>{
                    if(r!=null)
                    {
                      const messageBox = this.modalService.open(AlertModalComponent)
                      messageBox.componentInstance.title = "BIEN HECHO.";
                      messageBox.componentInstance.message = "Cliente registrado. Cuenta de cliente creada.";
                      this.clientes();
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
  pedirInforAdministrador()
  {
    this.administradorService.buscar(this.usuario.idPersona).subscribe(
      r => {
        this.administrador = r;
      }
    )
  }

  atualizarInformacion(tipoInformacion: string)
  {
    switch (this.Rol){
      case "Cliente":
        
      break;
      case "Domiciliario":
        
      break;
      case "Administrador":
        this.actualizarInformacionAdministrador();
      break;
    }
  }

  actualizarInformacionAdministrador()
  {
    var administradorInformacionNueva = this.administrador;
    var acumulado: number;
    acumulado = 0;
    if(confirm("Se actualizaran solo los campos en los que ingreso datos. ¿De acuerdo?"))
    {
      this.administradorActualizar.identificacion = this.usuario.idPersona;
      if(this.administradorActualizar.nombres != undefined && this.administradorActualizar.nombres.trim() != "" )
      {
        acumulado++;
        administradorInformacionNueva.nombres = this.administradorActualizar.nombres;
      }
      if(this.administradorActualizar.apellidos != undefined && this.administradorActualizar.apellidos.trim() != "" )
      {
        acumulado++;
        administradorInformacionNueva.apellidos = this.administradorActualizar.apellidos;
      }
      if(this.administradorActualizar.puesto != undefined && this.administradorActualizar.puesto.trim() != "" )
      {
        acumulado++;
        administradorInformacionNueva.puesto = this.administradorActualizar.puesto;
      }
      if(this.administradorActualizar.telefono != undefined && this.administradorActualizar.telefono.trim() != "" )
      {
        acumulado++;
        administradorInformacionNueva.telefono = this.administradorActualizar.telefono;
      }
      if(this.administradorActualizar.whatsapp != undefined && this.administradorActualizar.whatsapp.trim() != "" )
      {
        acumulado++;
        administradorInformacionNueva.whatsapp = this.administradorActualizar.whatsapp;
      }
      if(acumulado>0)
      {
        this.administradorService.Actualizar(administradorInformacionNueva).subscribe(r =>{
          this.pedirInforAdministrador();
          alert("Datos actualizados personales correctamente");
        });
      }
      acumulado = 0;
      if(this.contrasenaActualizar != undefined && this.contrasenaActualizar.trim() != "")
      {
        acumulado++;
      }
      if(this.contrasenaconfirmar != undefined && this.contrasenaconfirmar.trim() != "" )
      {
        acumulado++;
      }
      if(acumulado>0)
      {
        if(acumulado == 2)
        {
          if(this.contrasenaActualizar == this.contrasenaconfirmar)
          {
            this.usuario.contraseña = this.contrasenaconfirmar;
            this.usuarioService.actualizarContraseña(this.usuario).subscribe(r =>{
              this.usuario.contraseña = null;
              alert("Contraseña actualizada")
            });
          }else{
            alert("Las contraseñas no coinsiden");
          }
        }else
        {
          alert("Para actualizar la contraseña debe ingresar la contraseña y confirmarla.");
        }
      }
    }
  }

  alternarBarra(){
    var i: number;
    var clases = document.getElementById("barraLateral").classList;
    var existe: boolean;
    existe = false;
    for (i = 0; i<clases.length; i++){
      if(clases[i] === "Ocultar"){
        existe = true;
      }
    }
    if(existe){
      document.getElementById("barraLateral").classList.remove("Ocultar");
        document.getElementById("barraLateral").classList.add("Mostrar");
    }else{
      document.getElementById("barraLateral").classList.add("Ocultar");
      document.getElementById("barraLateral").classList.remove("Mostrar");
    }
  }
}

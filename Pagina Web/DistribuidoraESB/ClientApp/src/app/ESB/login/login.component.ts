import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from '../Models/user';
import { Usuario } from '../Models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: User;

  formularioinicioSesion: FormGroup

  constructor(
    private router: Router,
    private service: UsuarioService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usuario = new User;
    this.BotonLogin();
    this.buildForm();
  }

  private buildForm() {
    this.usuario = new User();
    this.usuario.contrasena = '';
    this.usuario.correo = '';
    this.formularioinicioSesion = this.formBuilder.group({
      contrasena: [this.usuario.contrasena, Validators.required],
      correo: [this.usuario.correo, Validators.required]
    });
  }

  get control() {
    return this.formularioinicioSesion.controls;
  }

  onSubmit() {
    if (this.formularioinicioSesion.invalid) {
      return;
    }
    this.iniciarSession();
  }
  BotonLogin() {
    this.service.EliminarUsuarioSesion();
    document.getElementById("BtnLogin").innerHTML = "LOG";
    document.getElementById("BtnRegistrar").classList.add("Mostrar");
    document.getElementById("BtnRegistrar").classList.remove("Ocultar");
  }
  iniciarSession() {
    this.usuario = this.formularioinicioSesion.value;
    this.service.validarSession(this.usuario.correo).subscribe(usuarioRespuesta => {
      if (usuarioRespuesta == null) {
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "ALERTA";
        messageBox.componentInstance.message = "No existe un usuario con este correo";
      } else {
        if (usuarioRespuesta.contraseña == this.usuario.contrasena) {
          usuarioRespuesta.contraseña = null;
          this.service.GuardarUsuarioSesion(usuarioRespuesta);
          document.getElementById("BtnLogin").innerHTML = "lOG OUT";
          if (usuarioRespuesta.rol == "Administrador") {
            this.router.navigate(['/Perfil']);
          } else {
            this.router.navigate(['/PerfilCliente']);
          }
        } else {

          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "ALERTA";
          messageBox.componentInstance.message = 'Contraseña incorrecta';
        }
      }
    });
  }
}

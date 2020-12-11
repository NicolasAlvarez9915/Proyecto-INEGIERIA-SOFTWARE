import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
  returnUrl: String;

  formularioinicioSesion: FormGroup

  constructor(
    private router: Router,
    private service: UsuarioService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.usuario = new User;
    this.BotonLogin();
    this.buildForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
  }
  iniciarSession() {
    this.usuario = this.formularioinicioSesion.value;
    this.authenticationService.login(this.usuario.correo, this.usuario.contrasena).pipe(first())
    .subscribe(
      data => {
        this.authenticationService.currentUser.subscribe(x => {
          if(x != null){
            if (x.rol == "Administrador") {
              this.router.navigate(['/Perfil']);
            } else {
              this.router.navigate(['/PerfilCliente']);
            }
          }
        });
      },
      error => {
        const modalRef = this.modalService.open(AlertModalComponent);
        modalRef.componentInstance.title = 'Acceso Denegado';
        modalRef.componentInstance.message = error.error;
      });
  }
}

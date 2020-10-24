import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private service: UsuarioService) {}

  ngOnInit(): void {
    this.usuario = new User;
  }

  iniciarSession(){
    if(this.validarCampos()){
      this.service.validarSession(this.usuario.correo).subscribe(usuarioRespuesta => {
        if (usuarioRespuesta == null )
        {
          alert("No existe un usuario con este correo");
        }else
        {
          if(usuarioRespuesta.contraseña == this.usuario.contrasena)
          {
            this.router.navigate(['/Perfil']);
          }else
          {
            alert("Contraseña incorrecta");
          }
        }
      }

      )
    }
  }

  validarCampos(): boolean{
    if(this.usuario.correo === undefined || this.usuario.correo.trim() === ""){
      alert("Debe ingresar el correo electronico");
      return false;
    }else{
      if(this.usuario.contrasena == undefined || this.usuario.contrasena.trim() == ""){
        alert("Debe ingresar la conntraseña");
        return false;
      }
    }
    return true;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: User;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.usuario = new User;
  }

  iniciarSession(){
    if(this.validarCampos()){
      this.router.navigate(['/Perfil']);
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

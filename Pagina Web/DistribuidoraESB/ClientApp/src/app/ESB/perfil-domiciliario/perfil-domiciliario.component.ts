import { Component, OnInit } from '@angular/core';
import {DomiciliarioService} from '../../services/domiciliario.service';
import {Usuario} from '../Models/usuario';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {Domiciliario} from '../Models/domiciliario';
import {RutaService} from '../../services/ruta.service';
import {Ruta} from '../Models/ruta';
import {ModalService} from '../../compartido/servicios/modal.service';

@Component({
  selector: 'app-perfil-domiciliario',
  templateUrl: './perfil-domiciliario.component.html',
  styleUrls: ['./perfil-domiciliario.component.scss']
})
export class PerfilDomiciliarioComponent implements OnInit {

  usuario: Usuario;
  rol: string;
  domiciliario: Domiciliario;
  mostrar: String;
  ruta: Ruta;
  filtroPedidos: String;
  contrasena: string;
  contrasenaConfirmar: string;

  totalPedidos: number;
  pagePedidos = 1;
  pageSizePedidos:number = 20;
  constructor(
    private router: Router,
    private service: DomiciliarioService,
    private authenticationService: AuthenticationService,
    private rutaService: RutaService,
    private modalService: ModalService
  ) {

  }

  ngOnInit(): void {
    this.domiciliario = new Domiciliario();
    this.domiciliario.nombres = "";
    this.validarSesion();
    this.obtenerDomiciliario();
  }
  validarSesion() {
    this.authenticationService.currentUser.subscribe(x => {
      this.usuario = x;
      if (this.usuario == null) {
        this.router.navigate(['/Login']);
      } else {
        this.rol = this.usuario.rol;
      }
    });
  }

  obtenerDomiciliario(){
    this.service.validarExistenciaDomiciliario(this.usuario.idPersona).subscribe(Domi =>{
      this.domiciliario = Domi.objeto;
      this.mostrar ="Principal";
      this.obtenerRuta();
    })
  }

  obtenerRuta()
  {
    this.ruta = new Ruta();
    this.rutaService.rutaDomiciliario(this.domiciliario.identificacion, false).subscribe(ruta =>{
      this.ruta = new Ruta();
      this.ruta.pedidos = [];
      if(ruta)
      {
        this.ruta = ruta.objeto;
        this.slicePedidos();
      }
    });
  }

  slicePedidos()
  {
    this.totalPedidos = this.ruta.pedidos.length;
    this.ruta.pedidos = this.ruta.pedidos.slice((this.pagePedidos - 1) * this.pageSizePedidos, (this.pagePedidos - 1) * this.pageSizePedidos + this.pageSizePedidos);
  }

  verPedido(idPedido: String)
  {
    var result  = this.modalService.openDialogInfoPedido(idPedido);
    result.afterClosed().subscribe(result =>{
      this.obtenerRuta();
    });
  }
}

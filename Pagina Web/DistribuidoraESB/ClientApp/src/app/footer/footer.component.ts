import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  style: {}
  baseUrl: string;
  constructor(
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
    this.generarEstilosFondo();
  }

  generarEstilosFondo()
  {
    this.style = {
      backgroundImage: 'url('+this.baseUrl+'imagenes/imagenesSistema/PicsArt_10-14-03.19.11.jpg)'
    };
  }


  ngOnInit(): void {
  }

}

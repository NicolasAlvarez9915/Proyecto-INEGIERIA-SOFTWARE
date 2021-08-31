import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Administrador } from 'src/app/ESB/Models/administrador';

@Component({
  selector: 'app-modal-decicion',
  templateUrl: './modal-decicion.component.html',
  styleUrls: ['./modal-decicion.component.css']
})
export class ModalDecicionComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }
  @Input() title;
  @Input() message;
  @Input() Administrador: Administrador;
  ngOnInit(): void {
  }

  addNewItem(value: boolean) {
    this.activeModal.dismiss('Close click');
  }

}

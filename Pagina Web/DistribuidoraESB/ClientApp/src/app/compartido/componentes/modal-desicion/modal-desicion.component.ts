import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-desicion',
  templateUrl: './modal-desicion.component.html',
  styleUrls: ['./modal-desicion.component.css']
})
export class ModalDesicionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalDesicionComponent>,
              @Inject(MAT_DIALOG_DATA) public datos) { }

  ngOnInit(): void {
  }

}

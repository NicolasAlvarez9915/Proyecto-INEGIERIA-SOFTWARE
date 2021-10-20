import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss']
})
export class ModalInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public datos) { }

  ngOnInit(): void {
  }

}

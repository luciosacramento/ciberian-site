import { Component, Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  templateUrl: './confirmacao.dialog.html',
  styleUrls: ['./confirmacao.dialog.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialog>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}
  
  cancelar(): void {
    this.dialogRef.close();
  }
  
  confirmar(){
      this.dialogRef.close('true');
    
    
  }
  

}
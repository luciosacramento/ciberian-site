import { Component, Injectable } from '@angular/core';
import { fadeDialogAnimations } from 'src/app/core/dialog.animations';


@Component({
  templateUrl: './aguarde.dialog.html',
  styleUrls: ['./aguarde.dialog.scss'],
  animations: fadeDialogAnimations
})

//Dialog utilizada para dar feedbak imediato ao usuario, obrigando o mesmo a esperar a execução finalizar.
//o HttpConfigInterceptor utiliza essa classe para, automaticamente, mostrar essa dialog durante execução de APIs
@Injectable({
  providedIn: 'root'
})
export class AguardeDialog {

  constructor() {

  }


}
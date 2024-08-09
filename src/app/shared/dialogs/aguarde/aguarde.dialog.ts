import { Component, Injectable } from '@angular/core';


@Component({
  templateUrl: './aguarde.dialog.html',
  styleUrls: ['./aguarde.dialog.scss']
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
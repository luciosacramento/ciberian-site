import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/rest.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private server: RestService) {}

  public sendMail(value:Array<any>){
    return this.server.post(environment.API_url,`enviar-email`,value);
  }

  public getSolucoes(){
    return this.server.get(environment.API_url,`solucoes`);
  }

  public getDocumentos(){
    return this.server.get(environment.API_url,`documentos`);
  }

  public getColaboradores(){
    return this.server.get(environment.API_url,`colaboradores`);
  }

  public getParceiros(){
    return this.server.get(environment.API_url,`parceiros`);
  }

  public verifyReCaptcha(TOKEN:string){
    return this.server.post(environment.API_url,`verifyrecaptcha`,{ token: TOKEN });
  }


}

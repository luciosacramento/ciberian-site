import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/rest.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InternaService {

  constructor(private server: RestService) {}

  public sendMail(value:Array<any>){
    return this.server.post(environment.API_url,`enviar-email`,value);
  }

  public getConfig(){
    return this.server.get(environment.API_url,`configuracoes-personalizadas`);
  }

}

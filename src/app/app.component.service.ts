import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { RestService } from './core/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {
  constructor(private rest:RestService) { }

  public obterPaginas():any {
    return this.rest.get(environment.API_url,`paginas`);
   // return this.rest.get("http://api-hml.tcm.ba.gov.br", `/portal-servidor/recadastramento/nacionalidades`);
  }

  public getConfig(){
    return this.rest.get(environment.API_url,`configuracoes-personalizadas`);
    //return this.rest.get("http://api-hml.tcm.ba.gov.br",`/portal-servidor/recadastramento/escolaridades`);
  }

  
}


import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { RestService } from './core/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppComponentService {
  constructor(private server:RestService) { }

  public obterPaginas():any {
    return this.server.get(environment.API_url,`paginas`);
  }

  public getConfig(){
    return this.server.get(environment.API_url,`configuracoes-personalizadas`);
  }

  
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/rest.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InternaService {

  constructor(private server: RestService, private http: HttpClient) {}

  public sendDenuncia(formData:FormData){

    console.log('FormData:',formData.getAll("nome") );  
    return this.http.post('https://www2.ciberian.com.br/wp-content/themes/ciberian/php/enviar_denuncia.php', formData);

  }

  public getConfig(){
    return this.server.get(environment.API_url,`configuracoes-personalizadas`);
  }

}

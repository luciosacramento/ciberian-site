import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from 'src/app/core/rest.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private server: RestService, private http: HttpClient) {}

  public sendMail(formData:FormData){

    //return this.server.post(environment.API_url,`enviar-email`,value);
    return this.http.post('https://www2.ciberian.com.br/wp-content/themes/ciberian/php/enviar_email.php', formData);
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


  verifyReCaptcha(TOKEN : string): any {

    //Access-Control-Allow-Origin
   // return this.http.get(`/wp-json/custom/v1/verify-recaptcha?token=${TOKEN}`)
      let formData = new FormData();      
      formData.append('token', TOKEN);

   return this.http.post('https://www2.ciberian.com.br/wp-content/themes/ciberian/php/verifyrecaptcha.php', formData);

  }
  


}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as moment from "moment";
import { environment } from "src/environment/environment";

//Classe básica, com funcionalidade prontas para chamada de webservices
//Demais classes services do projeto devem utilizar a mesma
@Injectable({
  providedIn: "root"
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  post(pUrl: string, pEndpoint: string, pData: any = {}) {
    this.validarAmbiente(pUrl);
    
    let headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.httpClient.post(pUrl + pEndpoint, JSON.stringify(pData), { headers: headers });

  }

  postBlob(pUrl: string, pEndpoint: string, pData: any) {
    this.validarAmbiente(pUrl);
    

    let headers: HttpHeaders = new HttpHeaders().set("Content-type", "application/json");

    return this.httpClient.post<Blob>(pUrl + pEndpoint, JSON.stringify(pData), { headers, observe:'response',responseType: "blob" as 'json'});

  }

  getBlob(pUrl: string, pEndpoint: string) {
    this.validarAmbiente(pUrl);
    

    let headers: HttpHeaders = new HttpHeaders().set("Content-type", "application/json");

    return this.httpClient.get<Blob>(pUrl + pEndpoint, { headers, observe:'response',responseType: "blob" as 'json'});

  }


  get(pUrl: string, pEndpoint: string, pHeaders?: { [header: string]: string }) {
    
    
    this.validarAmbiente(pUrl);
    
    return this.httpClient.get(pUrl + pEndpoint,pHeaders);
  }



  //Retorna a string formatada dos parametros para envio via request param
  formatarParams(pNomes: string[], pValores: any[]): string { 
    let lRetorno = "";
    for (let i = 0; i < pNomes.length; i++) {
      let lValor = pValores[i];

      if (lValor != null && typeof lValor != undefined && lValor.toString() != "") {
        if (i > 0) {
          lRetorno += "&";
        }

        //Formata a datapara o formato ISO necessario às APIs
        if (lValor instanceof Date) {
          lValor = moment(lValor);
        }
        if (moment.isMoment(lValor)) {
          lValor = lValor.format("YYYY-MM-DDTHH:mm:ss.SSS-03:00");
        }
        lRetorno += pNomes[i] + "=" + encodeURIComponent(lValor);
      }

    }

    return lRetorno;
  }


  //Formata os valores dos parametros recebidos no formato esperado para envio Json e http request
  formatarParamsJson(pParams: { [key: string]: any }): string {

    let lParams: string[] = []
    let lValues: any[] = [];
    if (pParams) {
      lParams = Object.keys(pParams);
      
      let i = 0;
      lParams.forEach(key => {
        lValues[i] = pParams[key];

        i++;
      })
    }
    return this.formatarParams(lParams, lValues);
  }

  //Faz uma validação básica para evitar que webservices do ambiente DESENV sejam chamados do ambiente PROD, e vice-versa
  validarAmbiente(pUrl: string) {

    //Em desenvolvimento, nao permite chamar com HTTPS, pois indica ser endereco de produção
    if (!environment.production && pUrl.startsWith("https:")) {
      throw new Error("Ambiente de desenvolvimento não pode acessar produção(https)");
    }

    //Em produção, não permite chamar endereco HTTP, pois indica ser endereco de desenvolvimento
    if (environment.production && pUrl.startsWith("http:")) {
      throw new Error("Configuração indevida de acesso aos serviços. Consulte o suporte técnico.");
    }


  };


}
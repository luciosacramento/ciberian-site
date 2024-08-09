import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AguardeDialog } from '../shared/dialogs/aguarde/aguarde.dialog';
import { Utils } from './utils';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    //Contador de solicitações de abertura de dialog.
    //Para controle e evitar abertura e fechamento de várias modais de aguarde simultaneamente
    private qtdDialogsAguarde: number;
    private dialogAguarde: MatDialogRef<AguardeDialog> | null = null;
    constructor(private utils: Utils) {

        this.qtdDialogsAguarde = 0;

    }

    intercept(pRequest: HttpRequest<any>, pNext: HttpHandler): Observable<HttpEvent<any>> {

        //Feed back a depender da presenca do parâmetro "_feedback" na url
        let lFeedBack = pRequest.urlWithParams.indexOf("_feedback=false") <= 0;

        if (lFeedBack) {
            this.qtdDialogsAguarde++;

            if (this.qtdDialogsAguarde == 1) {

                this.dialogAguarde = this.utils.abrirDialogAguarde();

            }
        }

        return pNext.handle(pRequest).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    let lResp: HttpResponse<any> = event;


                    //DMN-51772 Verifica se a resposta foi uma exception de negocio exception json
                    if (lResp.body?.negocioException) {
                        let lErr: any = new Error(lResp.body.message);
                        lErr.negocioException = lResp.body;
                        throw lErr;
                    }

                    if (lFeedBack) {
                        setTimeout(() => {
                            this.qtdDialogsAguarde--;
                            if (this.qtdDialogsAguarde == 0) {
                                this.dialogAguarde?.close();
                            }
                        }, 100);
                    }

                }

                return event;
            }),
            catchError(error => {
                if (lFeedBack && this.dialogAguarde) {
                    setTimeout(() => {
                        this.qtdDialogsAguarde = 0
                        this.dialogAguarde?.close()
                    }, 100)
                }
                return throwError(error);

            }));

    }

}

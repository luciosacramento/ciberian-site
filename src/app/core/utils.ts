import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from 'moment';
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AguardeDialog } from "../shared/dialogs/aguarde/aguarde.dialog";
import { ConfirmacaoDialog } from "../shared/dialogs/confirmacao/confirmacao.dialog";

type SortDirection = 'asc' | 'desc';

//Classe com funcionalidades utilitárias que podem ser reaproveitadas em diversas telas
@Injectable()
export class Utils {
   

    constructor(protected route: ActivatedRoute, protected router: Router,private toastr: ToastrService,public dialog: MatDialog) {

    }

    //Formatada para mensagens de confirmação de operações bem sucedidas(ex.: Registro excluído com sucesso)
    exibirSucesso(msg: string) {
        setTimeout(() => this.toastr.success(msg, ''));

    }
    //Formatada para mensagens de erro
    exibirErro(msg: string) {
        setTimeout(() => this.toastr.error(msg, ''));

    }
    //Mensagens de alerta(ex.: sua senha expirará em 2 dias)
    exibirWarning(msg: string) {
        setTimeout(() => this.toastr.warning(msg, ''));

    }
    //Informações relevantes para o usuario(ex.: dois novos processos disponíveis)
    exibirInformacao(msg: string) {
        setTimeout(() => this.toastr.info(msg, ''));

    }

    //Método que obtém a resposta dos resolvers.
    get respResolvers() {
        return this.route.snapshot.data
    }
    //Método que obtém a resposta dos resolvers.
    get parentRespResolvers() {
        return this.route.parent?.snapshot.data
    }

    formatarData(pIsoDate: string) {
        if (pIsoDate != null) {
            return moment(pIsoDate, moment.ISO_8601).format('DD/MM/YYYY');
        } else {
            return null;
        }

    }
    formatarDataHora(pIsoDate: string) {

        if (pIsoDate != null) {
            return moment(pIsoDate, moment.ISO_8601).format('DD/MM/YYYY HH:mm');
        } else {
            return null;
        }

    }

    public formatarHora(pIsoDate: string) {
        if (pIsoDate != null) {
            return moment(pIsoDate, moment.ISO_8601).format('HH:mm');
        } else {
            return null;
        }
    }

    //Obtem o valor de um parâmetro recebido na rota corrente
    public obterParametro(pParametro: string) {
        let lParametro = this.route.snapshot.paramMap.get(pParametro);
        if (lParametro != null && lParametro != "undefined") {
            return lParametro;
        } else {
            return null;
        }
    }


    //Atualiza a tela corrente
    reload() {
        window.location.reload();

    }



    //Ordena um array de objetos com base nos nomes dos atributos e direção()
    sort(records: Array<any>, atributos: string[], direction: SortDirection): any {
        let directions:number[];
        if (direction == "asc") {
            directions = [1];
        } else {
            if (direction == "desc") {
                directions = [-1];
            }
        }
        return records.sort(function (a, b) {
            for (let i = 0; i < atributos.length; i++) {
                if (a[atributos[i]] < b[atributos[i]]) {
                    return -1 * directions[i]
                }
                else if (a[atributos[i]] > b[atributos[i]]) {
                    return 1 * directions[i];
                }
            }
            return 0;
        });

    };



    //retorna a rota atual, incluindo a URL e seus parametros
    obterRotaAtual() {

        let lParams = this.obterParamsRotaCorrente();

        return [this.obterUrlRotaAtual(), lParams];
    }

    obterUrlRotaAtual(): string {
        //Retorna a url da rota atual, sem os parametros
        let lIndex = this.router.url.indexOf(';');
        if (lIndex >= 0) {
            //A partir do ';' vem os parametros que devem ser desconsiderados
            return this.router.url.substring(0, this.router.url.indexOf(';'));
        } else {
            return this.router.url;
        }
    }

    
    obterParamsRotaCorrente():Params {
        return this.route.snapshot.params;
    }

    //Provoa o refresh do browser na rota corrente
    atualizar() {
        this.router.navigate(this.obterRotaAtual(), { replaceUrl: true }).then(resp => {

        });
    }

    abrirDialogAguarde(): MatDialogRef<AguardeDialog> {

        let dialogRef = this.dialog.open(AguardeDialog, {
            width: '250px', 
            disableClose: true,restoreFocus:true,autoFocus:false,closeOnNavigation:true,hasBackdrop:true
        }
        );
        return dialogRef;
    }
    
    abrirDialogConfirmacao(pMsg:string): MatDialogRef<ConfirmacaoDialog> {
        let lMsg: string = pMsg;
        //Verifica se tem ao menos um item selecionado e abre o modal para confirmar a exclusão
        let dialogRef = null;

        dialogRef = this.dialog.open(ConfirmacaoDialog, {
            width: '250px',
            data: { msg: lMsg },
            autoFocus: true, disableClose: true, hasBackdrop: true

        })


        return dialogRef;
    }

}
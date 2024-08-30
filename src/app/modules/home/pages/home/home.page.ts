import { Component, ElementRef, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { map } from 'rxjs';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/core/utils';
import { Loja } from 'src/app/core/interface/loja';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { AppComponentService } from 'src/app/app.component.service';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        display: 'block'
      })),
      state('closed', style({
        opacity: 0,
        top: '-20000px',
        position: 'absolute',
        display: 'none'
      })),
      transition('open => closed', [
        animate('0.6s')
      ]),
      transition('closed => open', [
        animate('0.6s')
      ]),
    ]),
  ],
})
export class HomePage implements OnInit {
  public pageData: any = null;
  public configData: any  = null;
  public formGroup:FormGroup = new FormGroup({});
  private formBuilder: FormBuilder = new FormBuilder();
  public searchTerm: string = '';
  public maisEmpresa: boolean = false;
  public solucoesList: any | null = null;
  public documentosList: any | null = null;
  public descricaoServico: string | null = null;
  public colaboradoresList: any | null = null;
  public descricaoColaborador: string | null = null;
  public descricaoSolucao: string | null = null;

  constructor(private homeService: HomeService,protected util:Utils, 
              private appService:AppComponentService, private dataService: DataService) {}

  ngOnInit(): void {

    //descricao-service

    this.dataService.currentDataArray.subscribe(data => {
      this.configData = data;
    });

    this.getPage();
    this.getConfig();
    this.getSolucoes();
    this.getDocumentos();
    this.getColaboradores()
  

    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      remetente: ['', Validators.required],
      telefone: [''],
      mensagem: [''],
      assunto: ['']
    });
  }

  private getPage() {
    this.dataService.currentDataArray.subscribe(data => {
      this.pageData =  data[1];
      this.descricaoSolucao = this.pageData[1].conteudo;
    });
  }

  private getConfig() {
    this.dataService.currentDataArray.subscribe(data => {
      this.configData =  data[0];
    });
  }

  public getSolucoes() {
    this.homeService.getSolucoes().subscribe(
      {
        next:  (data:any) => {
          console.log('Dados obtidos solucoesList:', data);
          this.solucoesList = this.splitIntoChunks(data, 3);
          console.log('this.solucoesList:', this.solucoesList);
        },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );
  }

  private splitIntoChunks(data: any[], chunkSize: number): any[][] {
    const chunks: any[][] = [];
  
    for (let i = 0; i < data.length; i += chunkSize) {
      const chunk = data.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
  
    return chunks;
  }

  public getDocumentos() {
    this.homeService.getDocumentos().subscribe(
      {
        next:  (data:any) => {
          console.log('Dados obtidos Documentos:', data);
          this.documentosList = data;
        },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );
  }

  //get colaboradores
  public getColaboradores() {
    this.homeService.getColaboradores().subscribe(
      {
        next:  (data:any) => {
          console.log('Dados obtidos colaboradores:', data);
          this.colaboradoresList = data;
        },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );
  }

  public showDescricao(id: number) {
    this.descricaoServico = this.documentosList[id].description;
  }

  public showDescricaoColaborador(id: number) {
    this.descricaoColaborador = this.colaboradoresList[id].description;
  }
  
  public showSolucaoDescricao(id: number) {
    this.descricaoSolucao = this.solucoesList[id].description;
  }

  public sendMail() {

    if(this.formGroup.valid){
      this.homeService.sendMail(this.formGroup.value).subscribe(
        {
          next:  (data:any) => {
            //console.log('Dados obtidos:', data.message);
            this.util.exibirSucesso(data.message);
            
           },
          error:  (erro) => {
            console.error(erro.error.message)
            this.util.exibirErro(erro.error.message);
          }
        }
      );
    }else{
      console.log('Formulário inválido');
    }
  }

  public showHideEmpresa() {
    this.maisEmpresa = !this.maisEmpresa;
    this.descricaoServico  = null
  }

 
  
}

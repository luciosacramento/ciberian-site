import { Component, ElementRef, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { map } from 'rxjs';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/core/utils';
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
import { OwlOptions } from 'ngx-owl-carousel-o';

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

  public customOptions: OwlOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    dotsEach: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  };

  constructor(private homeService: HomeService,protected util:Utils, 
              private appService:AppComponentService, private dataService: DataService,
              private fb: FormBuilder) {}

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
  

    this.formGroup = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      remetente: ['', [Validators.required, Validators.email]],
      assunto: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Exemplo de regex para números
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private getPage() {
    this.dataService.currentDataArray.subscribe(data => {
      this.pageData =  data[1];
      if(this.pageData){
        this.descricaoSolucao = this.pageData[1].conteudo;
      }
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
          this.solucoesList = this.splitIntoChunks(data, 6);
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
  
  public showSolucaoDescricao(idPai:number, id: number) {
    console.log('id:', id);
    console.log('this.solucoesList[id]:', this.solucoesList[id]);
    this.descricaoSolucao = this.solucoesList[idPai][id].description;
  }

  public sendMail() {

    if (this.formGroup.valid) {
      // Lógica para enviar o email
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
        this.util.exibirErro("Formulário incompleto");
      }
    } else {
      this.formGroup.markAllAsTouched(); // Marca todos os campos como "touched" para exibir os erros
    }

  }

  // Função para facilitar a exibição de mensagens de erro
  hasError(field: string, errorType: string) {
    return this.formGroup.get(field)?.hasError(errorType) && this.formGroup.get(field)?.touched;
  }

  public showHideEmpresa() {
    this.maisEmpresa = !this.maisEmpresa;
    this.descricaoServico  = null
  }

 
  
}

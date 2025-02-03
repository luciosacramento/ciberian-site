import { environment } from 'src/environment/environment';
import { Component, ElementRef, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { map } from 'rxjs';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';



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
  public parceirosList:any | null = [];
  public parceirosSlides:any | null = [];
  public descricaoColaborador: string | null = null;
  public descricaoSolucao: string | null = null;
  public selectedIndex: number | null = null;
  public chaveCaptcha:string = environment.chaveCaptcha;
  public captchaResolved = false;
  

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
              private fb: FormBuilder,
              private recaptchaV3Service: ReCaptchaV3Service,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {

    //descricao-service

    this.dataService.currentDataArray.subscribe(data => {
      this.configData = data;
    });

    this.getPage();
    this.getConfig();
    this.getSolucoes();
    this.getDocumentos();
    this.getColaboradores();
    this.getParceiros();
  

    this.formGroup = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      remetente: ['', [Validators.required, Validators.email]],
      assunto: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Exemplo de regex para números
      mensagem: ['', [Validators.required, Validators.minLength(10)]],
     // recaptcha: [null, Validators.required]
    });

    
  }

  private scrollToFragment() {
    //console.log("scrollToFragment");
    const fragment = this.router.url.split('#')[1];

    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        // Pega a posição do elemento em relação ao viewport
      const rect = element.getBoundingClientRect();
      // Usa a posição absoluta do elemento em relação ao documento
      window.scrollTo({
        top: rect.top + window.pageYOffset, // adicione o deslocamento atual da página
        behavior: 'smooth' // animação suave ao rolar
      });
      }
    }
  }

  

  private getPage() {
    this.dataService.currentDataArray.subscribe(data => {
      this.pageData =  data[1];
      if(this.pageData){
        this.descricaoSolucao = this.pageData[1].conteudo;
        setTimeout(() => {
        this.scrollToFragment();
      }, 2000);
      
      }
    });
  }

  private getConfig() {
    this.dataService.currentDataArray.subscribe(data => {
      this.configData =  data[0];
      setTimeout(() => {
        this.scrollToFragment();
      }, 2000);
      
    });
  }

  public getSolucoes() {
    this.homeService.getSolucoes().subscribe(
      {
        next:  (data:any) => {
          //console.log('Dados obtidos solucoesList:', data);
          this.solucoesList = this.splitIntoChunks(data, 6);
          setTimeout(() => {
        this.scrollToFragment();
      }, 2000);
      
         // console.log('this.solucoesList:', this.solucoesList);
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
         // console.log('Dados obtidos Documentos:', data);
          this.documentosList = data;
          setTimeout(() => {
        this.scrollToFragment();
      }, 2000);
      
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
         // console.log('Dados obtidos colaboradores:', data);
          this.colaboradoresList = data;
          setTimeout(() => {
        this.scrollToFragment();
      }, 2000);
      
        },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );
  }

  //get Parceiros
  public getParceiros() {
    this.homeService.getParceiros().subscribe(
      {
        next:  (data:any) => {
          //console.log('Dados obtidos Parceiros:', data);
          this.parceirosList = data;
          setTimeout(() => {
        this.scrollToFragment();
      }, 2000);
      

          const chunkSize = 5;
          for (let i = 0; i < this.parceirosList.length; i += chunkSize) {

            let chunkSizeLast:number = i + chunkSize;
            // console.log(this.parceirosList.slice(i, chunkSizeLast));
            
            if(i + chunkSize > this.parceirosList.length){
              chunkSizeLast = this.parceirosList.length;
            }
           // console.log(i,chunkSizeLast);

              this.parceirosSlides.push(this.parceirosList.slice(i, chunkSizeLast));

          }

          //console.log('parceirosSlides:', this.parceirosSlides);

        },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );

    console.log("this.parceirosSlides",this.parceirosSlides);
  }

  public showDescricao(id: number) {
    this.descricaoServico = this.documentosList[id].description;
  }

  public showDescricaoColaborador(id: number) {
    this.descricaoColaborador = this.colaboradoresList[id].description;
  }
  
  public showSolucaoDescricao(idPai:number, id: number) {
   // console.log('id:', id);
    //console.log('this.solucoesList[id]:', this.solucoesList[id]);
    this.descricaoSolucao = this.solucoesList[idPai][id].description;
    this.selectedIndex = id;
  }


  public VerifySendMail() {

    this.recaptchaV3Service.execute('importantAction')
    .subscribe({
      
      next:  (data:any) => {
        //console.log('Dados obtidos:', data);
        this.verifyReCaptcha(data);
        //this.util.exibirSucesso(data.message);
        
       },
      error:  (erro) => {
        console.error(erro.error.message)
        this.util.exibirErro(erro.error.message);
      }

    });

   }

  public verifyReCaptcha(responseToken:string) {

    this.homeService.verifyReCaptcha(responseToken).subscribe(
      {
        next:  (data:any) => {
          if(data.success){
            this.sendMail();
          }
        },
        error:  (erro:any) => {
          console.error(erro)
        }
      }
    );
  }

  
  
  private sendMail(){

      // Lógica para enviar o email
      if(this.formGroup.valid){

        let formData = new FormData();      
        formData.append('telefone', this.formGroup.get('telefone')?.value);
        formData.append('assunto', this.formGroup.get('assunto')?.value);
        formData.append('nome', this.formGroup.get('nome')?.value);
        formData.append('mensagem', this.formGroup.get('mensagem')?.value);
        formData.append('remetente', this.formGroup.get('remetente')?.value);

        this.homeService.sendMail(formData).subscribe(
          {
            next:  (data:any) => {
              //console.log('Dados obtidos:', data.message);
              this.util.exibirSucesso(data.message);
              this.formGroup.reset();
              
             },
            error:  (erro) => {
              this.formGroup.markAllAsTouched();
              this.util.exibirErro(erro.error.message);
            }
          }
        );
      }else{
        this.formGroup.markAllAsTouched();
        this.util.exibirErro("Formulário incompleto");
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

  public sanitize(str:string) {
    return this.util.sanitize(str);
  }

 
  
}

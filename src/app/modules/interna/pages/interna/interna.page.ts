import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/core/utils';
import { InternaService } from '../../interna.service';
import { DataService } from 'src/app/core/data.service';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'src/app/modules/home/home.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-interna',
  templateUrl: './interna.page.html',
  styleUrls: ['./interna.page.scss'],
})
export class InternaPage implements OnInit {
  public pageData: any = [];
  public slug: string | null = null;
  public denunciaForm: FormGroup | null = null;

  constructor(private route:ActivatedRoute, private internaService: InternaService,
              protected util:Utils, private dataService: DataService,private fb: FormBuilder,
              private homeService:HomeService, private recaptchaV3Service: ReCaptchaV3Service) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const cod = params['id'];
      this.getPage(cod);
    });

    this.denunciaForm = this.fb.group({
      nome: [''],  // Não obrigatório
      sobrenome: [''],  // Não obrigatório
      email: ['', [Validators.required,Validators.email]],  // Não obrigatório, mas com validação de email
      comentario: ['', [Validators.required]]  // Obrigatório
    });
  }

  private getPage(cod:string) {
    this.dataService.currentDataArray.subscribe(data => {

      console.log(data);
      if(data[1]){
        this.pageData = this.buscarPorSlug(data[1],cod);
        //this.pageData =  data[1][cod];
        this.slug = this.pageData.slug;
        console.log('pageData:', this.pageData);
      }
    });
  }

  private buscarPorSlug(data:Array<any>,slug:string) {
    return data.find((pagina:any) => pagina.slug === slug);
  }

  public verifyEnviarDenuncia() {

    this.recaptchaV3Service.execute('importantAction')
    .subscribe({
      
      next:  (data:any) => {
        console.log('Dados obtidos:', data);
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
            this.enviarDenuncia();
          }
        },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );
  }

  enviarDenuncia() {
    if (this.denunciaForm && this.denunciaForm.valid) {
        this.internaService.sendDenuncia(this.denunciaForm.value).subscribe(
          {
            next:  (data:any) => {
              //console.log('Dados obtidos:', data.message);
             // this.verifyReCaptcha(data);
              this.util.exibirSucesso(data.message);
              
            },
            error:  (erro) => {
              this.denunciaForm?.markAllAsTouched();
              this.util.exibirErro(erro.error.message);
            }
          }
        );
      // Aqui você pode fazer o envio do formulário
    } else {
      this.denunciaForm?.markAllAsTouched();
      this.util.exibirErro('Formulário inválido');
    }
  }


  public sanitize(str:string) {
    return this.util.sanitize(str);
  }

 
  
}

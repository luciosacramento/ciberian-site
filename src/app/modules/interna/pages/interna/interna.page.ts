import { Component, OnInit } from '@angular/core';
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
import { InternaService } from '../../interna.service';
import { DataService } from 'src/app/core/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interna',
  templateUrl: './interna.page.html',
  styleUrls: ['./interna.page.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.8,
        backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ],
})
export class InternaPage implements OnInit {
  public pageData: any = [];
  public lojaList: Loja[] | null = null;
  public configData: any = [];
  public formGroup:FormGroup = new FormGroup({});
  private formBuilder: FormBuilder = new FormBuilder();
  public searchTerm: string = '';
  public maisEmpresa: boolean = false;
  public listPages: any[] = [];

  constructor(private route:ActivatedRoute, private internaService: InternaService,protected util:Utils, private dataService: DataService) {}

  ngOnInit(): void {

    console.log('Iniciando página interna');

    this.route.params.subscribe(params => {
      const cod = params['id'];
      this.getPage(cod);
      console.log('Parâmetro cod:', params);
    });

    this.dataService.currentDataArray.subscribe(data => {
      this.listPages = data;
    });

    this.getConfig();

    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      remetente: ['', Validators.required],
      telefone: [''],
      mensagem: [''],
      assunto: ['']
    });
  }

  private getPage(cod:number) {
    this.dataService.currentDataArray.subscribe(data => {
      this.pageData =  data[1][cod];
      console.log('pageData:', this.pageData);
    });
  }

  private getConfig() {
  
    this.internaService.getConfig().subscribe(
      {
        next:  (data:any) => {
          this.configData = data; 
          console.log('Dados obtidos:', this.configData);
         },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );
  }

  public sendMail() {

    if(this.formGroup.valid){
      this.internaService.sendMail(this.formGroup.value).subscribe(
        {
          next:  (data:any) => {
            //console.log('Dados obtidos:', data.message);
            this.util.exibirSucesso(data.message);
            
           },
          error:  (erro) => {
            console.error(erro)
          }
        }
      );
    }else{
      console.log('Formulário inválido');
    }
  }

  public showHideEmpresa() {
    this.maisEmpresa = !this.maisEmpresa;
  }

 
  
}

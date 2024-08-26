import { Component, OnInit } from '@angular/core';
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

  constructor(private homeService: HomeService,protected util:Utils, 
              private appService:AppComponentService, private dataService: DataService) {}

  ngOnInit(): void {

    this.dataService.currentDataArray.subscribe(data => {
      this.configData = data;
    });

    this.getPage();
    this.getConfig();
    this.getSolucoes();


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
          this.solucoesList = data;
        },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );
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

import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { map } from 'rxjs';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/core/utils';
import { Loja } from 'src/app/core/interface/loja';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public pageData: any = [];
  public lojaList: Loja[] | null = null;
  public configData: any = [];
  public formGroup:FormGroup = new FormGroup({});
  private formBuilder: FormBuilder = new FormBuilder();
  public searchTerm: string = '';

  constructor(private homeService: HomeService,protected util:Utils) {}

  ngOnInit(): void {
    this.getPage();
    this.getConfig();
    this.getLoja();

    this.formGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      remetente: ['', Validators.required],
      telefone: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  private getPage() {
    
  }

  private getConfig() {
  
   
  }

  public getLoja() {

   

  }

 
  
}

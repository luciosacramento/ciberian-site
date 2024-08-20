import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Utils } from 'src/app/core/utils';
import { Loja } from 'src/app/core/interface/loja';
import { HomeService } from './modules/home/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title:string = 'Ciberian';
  public configData: any = [];

  constructor(private router: Router,private homeService: HomeService) {
    
  }

  ngOnInit(): void {
    this.getConfig();
  }

  public actualPage():string{
    const currentUrl = this.router.url; // Obtém a URL atual
    const segments = currentUrl.split('/'); // Divide a URL em segmentos
    const pageName = segments[1]; // Obtém o último segmento, que é o nome da página
    console.log('Nome da página atual:', pageName);
    return pageName;
  }

  private getConfig() {
  
    this.homeService.getConfig().subscribe(
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
  
}

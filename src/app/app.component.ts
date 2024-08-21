
import { Router } from '@angular/router';
import { AppComponentService } from './app.component.service';
import { Component } from '@angular/core';
import { HomeService } from './modules/home/home.service';
import { DataService } from './core/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title:string = 'Ciberian';
  public configData: any = [];
  public pageList: any = [];

  constructor(private router: Router,
    private appService: AppComponentService, 
    private dataService: DataService) {
    
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

    console.log('getConfig:');
  
    this.appService.getConfig().subscribe(
      {
        next:  (data:any) => {
          console.log('Dados obtidos:', data);
          this.configData = data; 
          this.dataService.addItem(this.configData);
          this.getPages();
         },
        error:  (erro) => {
          console.error(erro)
        }
      }
    );
  }

  private getPages() {
    this.appService.obterPaginas().subscribe(
      {
        next:  (data:any) => {
          console.log('Dados obtidos:', data);
          this.dataService.addItem(data);
          this.dataService.currentDataArray.subscribe(data => {
            console.log('Dados obtidos 2 :', data);
          });
          this.pageList = data;
        }
      }
    );
  }

  public getSlug(slug:string):string{
    return slug.toLowerCase();
  }
  
}

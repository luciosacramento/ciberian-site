
import { Router } from '@angular/router';
import { AppComponentService } from './app.component.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataService } from './core/data.service';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RotaService } from './shared/rota-service';
import { Modal } from 'bootstrap';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  @ViewChild('meuModal', { static: false }) modalElement!: ElementRef;
  private modalInstance!: Modal;

  public title:string = 'Ciberian';
  public configData: any = [];
  public pageList: any = [];
  public showMenu: boolean = false;
  pdfUrl: string = 'assets/pdf.pdf'; // Caminho do PDF
  safePdfUrl: SafeResourceUrl; // URL sanitizada


  constructor(private router: Router,
    private appService: AppComponentService, 
    private dataService: DataService, 
    private sanitizer: DomSanitizer) {

      this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
    
  }

  ngAfterViewInit() {

    if (this.modalElement) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);

      if (this.modalInstance) {
        this.modalInstance.show();
      }
    }
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.scrollToFragment();
      }, 2000);
      
    });

    
    this.getConfig();
  }

  private scrollToFragment() {
 
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


  public actualPage():string{
    const currentUrl = this.router.url; // Obtém a URL atual
    const segments = currentUrl.split('/'); // Divide a URL em segmentos
    const pageName = segments[1]; // Obtém o último segmento, que é o nome da página
    return pageName;
  }

  private getConfig() {

  
    this.appService.getConfig().subscribe(
      {
        next:  (data:any) => {
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

  public showMenuMobile(){
    this.showMenu = !this.showMenu;
  }
  
}

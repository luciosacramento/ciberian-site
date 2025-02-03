import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
  export class RotaService {
    constructor(private router: Router) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          //this.scrollToFragment();
          setTimeout(() => {
            this.scrollToFragment();
          }, 1000);

        }
      });
    }
  
    suaFuncao() {

    }
    private scrollToFragment() {
        //console.log('Rota mudou! Executando função global...');
        //console.log("scrollToFragment2");
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

  }
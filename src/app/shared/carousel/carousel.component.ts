import { Component, OnInit, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;

  items = [
    { image: 'https://via.placeholder.com/400x200?text=Image+1', altText: 'Image 1', text: 'Texto 1' },
    { image: 'https://via.placeholder.com/400x200?text=Image+2', altText: 'Image 2', text: 'Texto 2' },
    { image: 'https://via.placeholder.com/400x200?text=Image+3', altText: 'Image 3', text: 'Texto 3' },
    { image: 'https://via.placeholder.com/400x200?text=Image+4', altText: 'Image 4', text: 'Texto 4' },
    { image: 'https://via.placeholder.com/400x200?text=Image+5', altText: 'Image 5', text: 'Texto 5' }
  ];

  currentIndex = 0;
  itemsVisible: number = 3;

  ngOnInit(): void {
    // Inicializações antes de acessar o DOM
  }

  ngAfterViewInit(): void {
    this.updateItemsVisible(); // Agora é seguro acessar o DOM
  }

  // Atualiza a quantidade de itens visíveis
  updateItemsVisible() {
    if (this.carousel) {
      const carouselWidth = this.carousel.nativeElement.offsetWidth;
      if (carouselWidth >= 1200) {
        this.itemsVisible = 4; // Exibe 4 itens para telas grandes
      } else if (carouselWidth >= 900) {
        this.itemsVisible = 3; // Exibe 3 itens para telas médias
      } else if (carouselWidth >= 600) {
        this.itemsVisible = 2; // Exibe 2 itens para telas pequenas
      } else {
        this.itemsVisible = 1; // Exibe 1 item para telas muito pequenas
      }
      this.updateCarouselPosition();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.items.length - this.itemsVisible) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCarouselPosition();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.items.length - this.itemsVisible;
    }
    this.updateCarouselPosition();
  }

  private updateCarouselPosition() {
    if (this.carousel) {
      const carouselWidth = this.carousel.nativeElement.offsetWidth;
      this.carousel.nativeElement.style.transform = `translateX(-${this.currentIndex * (carouselWidth / this.itemsVisible)}px)`;
    }
  }

  // Listener para atualizar a quantidade de itens visíveis quando a janela for redimensionada
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateItemsVisible();
  }
}

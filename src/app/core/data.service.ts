import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Este serviço estará disponível globalmente
})
export class DataService {
  // Array compartilhado
  private dataArray = new BehaviorSubject<any[]>([]); // Inicializando com um array vazio
  currentDataArray = this.dataArray.asObservable();

  constructor() {}

  // Método para atualizar o array
  updateDataArray(newArray: any[]) {
    this.dataArray.next(newArray);
  }

  // Método para adicionar um item ao array
  addItem(item: any) {
    const currentArray = this.dataArray.getValue();
    currentArray.push(item);
    this.dataArray.next(currentArray); // Atualiza o BehaviorSubject
  }

  // Método para acessar o array diretamente (não reativo)
  getDataArray() {
    return this.dataArray.getValue();
  }
}

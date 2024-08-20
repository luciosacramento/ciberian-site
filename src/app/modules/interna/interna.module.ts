import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InternaPage } from './pages/interna/interna.page';
import { InternaRoutingModule } from './interna-routing.module';

@NgModule({
  declarations: [
    InternaPage
  ],
  imports: [
    CommonModule,
    SharedModule,
    InternaRoutingModule
  ]
})
export class InternaModule {
  constructor() {
  }
 }

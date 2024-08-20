import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternaPage } from './pages/interna/interna.page';

const routes: Routes = [
  {
    path:"politica-de-privacidade",
    component: InternaPage,
  },
  {
    path:"politica-de-cookie",
    component: InternaPage,
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternaRoutingModule { }

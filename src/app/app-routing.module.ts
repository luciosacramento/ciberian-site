import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path:'home',loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  { path:'interna',loadChildren: () => import('./modules/interna/interna.module').then(m => m.InternaModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

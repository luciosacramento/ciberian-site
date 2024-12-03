import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path:'home',loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  { path:'interna/:id',loadChildren: () => import('./modules/interna/interna.module').then(m => m.InternaModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

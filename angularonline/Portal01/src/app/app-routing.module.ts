import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DersComponent } from './components/ders/ders.component';
import { DerslisteleComponent } from './components/derslistele/derslistele.component';
import { HomeComponent } from './components/home/home.component';
import { OgrenciComponent } from './components/ogrenci/ogrenci.component';
import { OgrlisteleComponent } from './components/ogrlistele/ogrlistele.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'ogrenci',
    component: OgrenciComponent
  },
  {
    path: 'ders',
    component: DersComponent
  },
  {
    path: 'derslistele/:ogrId',
    component: DerslisteleComponent
  },
  {
    path: 'ogrlistele/:dersId',
    component: OgrlisteleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

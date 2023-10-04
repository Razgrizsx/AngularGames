import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { TatetiComponent } from './pages/tateti/tateti.component';
import { HangmanComponent } from './pages/hangman/hangman.component';
import { BottlesComponent } from './pages/bottles/bottles.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent
  },
  {
    path: 'tateti',
    component: TatetiComponent
  },
  {
    path:'ahorcado',
    component: HangmanComponent
  },
  {
    path:'botellas',
    component: BottlesComponent
  },
  {
    path:'**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

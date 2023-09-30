import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { TatetiComponent } from './pages/tateti/tateti.component';
import { TestComponent } from './pages/test/test.component';

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
    path:'test',
    component: TestComponent
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

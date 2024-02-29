import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuperherosDetailComponent } from './1_presentation/components/superhero-detail/superheros-detail.component';
import { SuperherosListComponent } from './1_presentation/components/superheros-list/superheros-list.component';

const routes: Routes = [
  { path: '', component: SuperherosListComponent },
  { path: 'superhero/:id', component: SuperherosDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

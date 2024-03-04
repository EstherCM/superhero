import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SuperherosDetailComponent } from './1_presentation/components/superheros-detail/superheros-detail.component';
import { SuperherosListComponent } from './1_presentation/components/superheros-list/superheros-list.component';
import { SuperherosEditComponent } from './1_presentation/components/superheros-edit/superheros-edit.component';
import { SuperherosCreateComponent } from './1_presentation/components/superheros-create/superheros-create.component';

const routes: Routes = [
  { path: '', component: SuperherosListComponent },
  { path: 'superhero/create', component: SuperherosCreateComponent },
  { path: 'superhero/:id', component: SuperherosDetailComponent },
  { path: 'superhero/:id/edit', component: SuperherosEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

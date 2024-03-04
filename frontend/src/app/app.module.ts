import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperherosListComponent } from './1_presentation/components/superheros-list/superheros-list.component';
import { SuperherosFilterComponent } from './1_presentation/components/superheros-filter/superheros-filter.component';
import { LoaderComponent } from './1_presentation/components/loader/loader.component';
import { SuperherosDetailComponent } from './1_presentation/components/superheros-detail/superheros-detail.component';
import { SuperherosEditComponent } from './1_presentation/components/superheros-edit/superheros-edit.component';
import { ConfirmationDialogComponent } from './1_presentation/components/confirmation-dialog/confirmation-dialog.component';
import { SuperherosCreateComponent } from './1_presentation/components/superheros-create/superheros-create.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperherosListComponent,
    SuperherosFilterComponent,
    LoaderComponent,
    SuperherosDetailComponent,
    SuperherosEditComponent,
    ConfirmationDialogComponent,
    SuperherosCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

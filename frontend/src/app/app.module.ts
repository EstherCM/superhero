import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperherosListComponent } from './1_presentation/components/superheros-list/superheros-list.component';
import { SuperherosFilterComponent } from './1_presentation/components/superheros-filter/superheros-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperherosListComponent,
    SuperherosFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

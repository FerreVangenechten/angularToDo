import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

//import the httpclientmodule to use the httpclient for the API
import { HttpClientModule } from '@angular/common/http';

//to create and use template driven forms
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

//drag and drop
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListFormComponent } from './list-form/list-form.component';
import { ItemFormComponent } from './item-form/item-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ListFormComponent,
    ItemFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

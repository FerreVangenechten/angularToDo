import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

//import the httpclientmodule to use the httpclient for the API
import { HttpClientModule } from '@angular/common/http';

//to create and use template driven forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ListFormComponent } from './list-form/list-form.component';
import { ItemFormComponent } from './item-form/item-form.component';

//drag and drop
import { DragDropModule } from '@angular/cdk/drag-drop';

//material
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    FormsModule,
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    ],
  providers: [
      MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

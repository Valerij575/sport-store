import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelModule } from './models/ModelModule';
import { StoreModule } from './store/store.module';
//import { ProductTableComponent } from './structure/productTable.component';
//import { CategoryFilterComponent } from './structure/categoryFilter.component';
//import { ProductDetailComponent } from './structure/productDetail.component';
//import { ProductListComponent } from "./store/productList/profuctList.component"

@NgModule({
  declarations: [
    AppComponent,
    //ProductTableComponent,
    //CategoryFilterComponent,
    //ProductDetailComponent,
    //ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModelModule,
    FormsModule,
    StoreModule
  ],
  providers: [], // {provide: APP_BASE_HREF, useValue : '/' }
  bootstrap: [AppComponent]
})
export class AppModule { }

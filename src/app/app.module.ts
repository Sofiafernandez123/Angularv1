import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { UserListComponent } from './components/product-list/user-list/user-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule,ReactiveFormsModule,


    RouterModule.forRoot([
      { path: 'products', component: ProductListComponent },
      { path: 'users', component: UserListComponent }
    ]),
      NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

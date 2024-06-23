import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'app', component: AppComponent },
  { path: '**', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AppRoutingModule,BrowserModule,HttpClientModule],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppRoutingModule {}

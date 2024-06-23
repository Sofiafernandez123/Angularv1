import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../services/product';
import { ProductService } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  searchTerm: string = '';
  private subscription!: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscription = this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  filteredProducts(): Product[] {
    return this.products.filter(product => 
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

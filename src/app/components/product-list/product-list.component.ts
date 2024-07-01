import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../services/product'; // Asegúrate de que la ruta sea correcta
import { ProductService } from '../../services/product.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  searchTerm: string = '';
  selectedProduct: Product | null = null;
  productForm: FormGroup;
  private subscription!: Subscription;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    // Inicializa el formulario reactivo
    this.productForm = this.fb.group({
      id: [''],
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription = this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log('Productos obtenidos:', this.products);
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filteredProducts(): Product[] {
    return this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.productForm.patchValue({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const updatedProduct = {
        id: this.productForm.value.id,
        title: this.productForm.value.title,
        price: this.productForm.value.price,
        description: this.productForm.value.description,
        category: this.productForm.value.category,
        image: this.productForm.value.image
      } as Product;

      this.productService.updateProduct(updatedProduct).subscribe(
        (product) => {
          const index = this.products.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.products[index] = product;
          }
          this.selectedProduct = null; // Clear selection after saving
          this.productForm.reset(); // Reset the form
        },
        (error) => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    }
  }
}


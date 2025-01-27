import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  ProductsService = inject(ProductsService);
  productForm: FormGroup<any>;
  
  constructor() {
    this.productForm = new FormGroup({
      _id: new FormControl(null, [Validators.required, Validators.minLength(1)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      category: new FormControl(null),
      image: new FormControl(null, [Validators.required, Validators.pattern(/https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)/)]),
      active: new FormControl(null, [Validators.required]),
    }, [])
  }


  anadirProducto(): void {
    let product: Product = this.productForm.value as Product;
    this.ProductsService.anadirProducto(product);
    this.productForm.reset();
  }

}

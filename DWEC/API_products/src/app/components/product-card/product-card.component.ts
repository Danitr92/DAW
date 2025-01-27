import { Component, inject, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

ProductService = inject(ProductsService);

  @Input() miProducto!: Product;

  EliminarProducto(product: Product) {
    this.ProductService.eliminarPorId(product._id);
  }

}

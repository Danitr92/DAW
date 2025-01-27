import { Component, inject } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductFilterComponent } from "../product-filter/product-filter.component";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  arrProducts: Product[] = [];
  ProductService = inject(ProductsService);

  filtrosAplicados: any = [];
  arrProductosFiltrados: Product[] = [];

  ngOnInit(): void {
    this.arrProducts = this.ProductService.mostrarProductos();
    this.arrProductosFiltrados = this.arrProducts;
  }

  aplicarFiltro(filtros: any): void {
    this.arrProductosFiltrados = this.arrProducts.filter((producto) => {
      const coincideNombre = !filtros.name || producto.name.toLowerCase().includes(filtros.name.toLowerCase());
      const coincideCategoria = !filtros.category || producto.category === filtros.category;
      const coincidePrecio = !filtros.price || producto.price <= +filtros.price; 
      return coincideNombre && coincideCategoria && coincidePrecio;
    });
    this.filtrosAplicados = filtros;
  }
  
  actualizarLista(_id: any): void {
    this.ProductService.eliminarPorId(_id);
    this.arrProductosFiltrados = this.ProductService.mostrarProductos();
    this.aplicarFiltro(this.filtrosAplicados);
  }

}

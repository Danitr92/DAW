import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public arrProducts: Product[] = [];

  constructor() { 

    fetch("https://jsonblob.com/api/1332798031678070784")
      .then(response => response.json())
      .then(productos => {
          productos.forEach((element: any) => {
          this.arrProducts.push(element as Product);
        });
      });

  }

  mostrarProductos(): Product[] {
    return this.arrProducts;
  }

  eliminarPorId(_id: any) {
    let i = this.arrProducts.findIndex(product => product._id == _id);
    if (i != -1 && i >= 0 && i < this.arrProducts.length) {
      this.arrProducts.splice(i, 1);
    }
    return this.arrProducts;
  }

  anadirProducto(product: Product) {
    this.arrProducts.unshift(product);
  }

}



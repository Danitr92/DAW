import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {

  filtros = {
    name: '',
    category: '',
    price: undefined as number | undefined
  };

  @Output() filtro = new EventEmitter<any>();
  
  aplicarFiltro(): void{
    this.filtro.emit(this.filtros);
  }

  borrarFiltro(filtroForm: NgForm) {
    this.filtros = {
      name: '',
      category: '',
      price: 0
    };
    this.aplicarFiltro();
  }

}

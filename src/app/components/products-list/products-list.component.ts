import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';
import productJson from '../../../assets/products-list.json';
import { ProductItemComponent } from '../product-item/product-item.component';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products: Array<Product> = productJson;
}

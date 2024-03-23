import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CounterService } from '../../services/counter.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() cartItem!: Product;
  items: any[] = [];
  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }

  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
  }

  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }
}

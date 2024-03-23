import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  counter = 0;
  items: any[] = [];
  constructor(private router: Router, private cartService: CartService,private counterService: CounterService) {
    this.items = this.cartService.getItems();
  }
  @Input() productItem!: Product;
  priceAfterSale!: number;
  itemRating?: number;
  redirectToDetails(id?: number) {
    this.router.navigate([`/product-details/${id}`]);
  }

  ngOnInit() {
    if (this.productItem) {
      this.priceAfterSale = Math.round(
        this.productItem.price! *
          (1 - this.productItem.discountPercentage! / 100)
      );
      this.itemRating = Math.round(this.productItem.rating!);
    }
    

  }

 


  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.counterService.setCounter(this.counter +1);
    window.alert('Product added to cart');
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

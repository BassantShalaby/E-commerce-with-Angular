import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import productJson from '../../../assets/products-list.json';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  products: Array<Product> = productJson;
  productDetails?: Product;
  priceAfterSale?: number;
  itemRating?: number;
  @Input() id?: string;

  ngOnInit() {
    this.productDetails = this.products.find(
      (product: Product) => product.id == this.id
    );

    if (this.productDetails) {
      this.priceAfterSale = Math.round(
        this.productDetails.price! *
          (1 - this.productDetails.discountPercentage! / 100)
      );
      this.itemRating = Math.round(this.productDetails.rating!);
    }
  }

  items: any[] = [];

  constructor(private cartService: CartService) {
    this.items = this.cartService.getItems();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
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

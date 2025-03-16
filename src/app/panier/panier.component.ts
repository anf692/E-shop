import {Component, inject, OnInit} from '@angular/core';
import {ProductsService} from "../products/data-access/products.service";
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {of} from "rxjs";

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})

export class PanierComponent implements OnInit {
  ProductsService : ProductsService = inject(ProductsService);
  card! : any

ngOnInit () {
   this.card = this.ProductsService.cart;
}

//methode pour incrementer
public increment(productId: number) {
  this.ProductsService.incrementQuantity(productId);
}

//methode pour decrementer
public decrement(productId: number) {
  this.ProductsService.decrementQuantity(productId);
}


//methode pour le tottal des prix
public get totalPrice(): number {
  return this.ProductsService.getTotalPrice();
}


public onDelete(productId: number) {
  this.ProductsService.removeFromCart(productId);
}


  constructor(private router: Router) {
 }


}
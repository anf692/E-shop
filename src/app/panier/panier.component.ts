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
   this.card = this.ProductsService.cart
}



// delete(id:Number){
//   this.ProductsService.delete(id).subscribe
// }
  constructor(private router: Router) {
 }


}
import {
  Component, computed, inject, OnInit,
} from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { BadgeModule } from 'primeng/badge';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CommonModule } from "@angular/common";
import {ProductsService} from "./products/data-access/products.service";
import {Product} from "./products/data-access/product.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule, CommonModule],
})
export class AppComponent implements OnInit {
  title = "Analyse de Performance Digital";

    //injecter le services
  private  ProductsService: ProductsService= inject(ProductsService);

  card = this.ProductsService.cart

  constructor(private router: Router) {
  }

  ngOnInit() {
this.card()
}

  onCheckOut() {
this.router.navigate(["/panier"]);
  }

}
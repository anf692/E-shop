import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import {PanierComponent} from "./panier/panier.component";
import { ContactComponent } from "./contact/contact.component";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },

  {
    path: 'panier' , component: PanierComponent ,title :'panier'
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES)
  },
  { path: "", redirectTo: "home", pathMatch: "full" },


  {
    path: "contact",
    component: ContactComponent,
  },
];

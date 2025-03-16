import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

interface CartItem {
    product: Product;
    quantity: number;
  }

@Injectable({
    providedIn: "root"
})


export class ProductsService {
    

    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";

    private readonly _products = signal<Product[]>([]);
    private readonly _cart = signal<CartItem[]>([]);  // Signal pour suivre les produits dans le panier

    public readonly products = this._products.asReadonly();
    public readonly cart = this._cart.asReadonly();  // Accéder au panier

    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError((error) => {
                console.warn("API indisponible, chargement des produits depuis JSON local", error);
                return this.http.get<Product[]>("assets/products.json").pipe(
                    catchError(() => {
                        console.error("Impossible de charger le JSON local non plus !");
                        return of([]);
                    })
                );
            }),
            tap((products) => this._products.set(products))
        );
    }
    
    // methode pour ajouter un produits
    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    // methode pour modifier un produits
    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    // methode pour supprimer un produits
    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }

    
    // Méthode pour ajouter un produit au panier
    public addToCart(product: Product): void {
        this._cart.update(cart => {
            const existingItem = cart.find(item => item.product.id === product.id);
            if (existingItem) {
                return cart.map(item =>
                    item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...cart, { product, quantity: 1 }];
            }
        });
    }

    // methode pour incrementer
    public incrementQuantity(productId: number): void {
        this._cart.update(cart =>
            cart.map(item =>
                item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }
    
    // methode pour decrementer
    public decrementQuantity(productId: number): void {
        this._cart.update(cart =>
            cart.map(item =>
                item.product.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    }
    
    // methode pour calucler le totale des produits
    public getTotalPrice(): number {
        const cartItems = this._cart(); // Si _cart est un signal, on l'appelle comme une fonction
    
        return cartItems.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    }
    

    // Méthode pour supprimer un produit du panier
    public removeFromCart(productId: number): void {
        this._cart.update(cart => cart.filter(item => item.product.id !== productId));
    }
    
}

  
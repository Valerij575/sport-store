import { Component } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';

@Component({
    selector: "store-cartSummary",
    templateUrl: "cartSummary.component.html"
})

export class CartSummaryComponent{
    
    constructor(private cart: Cart){}

    get itemCount(): number{
        return this.cart.itemCount;
    }

    get totalPrice(): number{
        return this.cart.totalPrice;
    }
}
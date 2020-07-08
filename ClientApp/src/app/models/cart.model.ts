import { Injectable } from "@angular/core";
import { Product } from './Product.model';
import { Repository } from './Repository.model';


@Injectable()
export class Cart{
    selections: ProductSelection[] = [];
    itemCount: number = 0;
    totalPrice: number = 0;

    constructor(private repo: Repository){
        repo.getSessionData<ProductSelection[]>("cart").subscribe(cartData => {
            debugger;
            if(cartData != null){
                cartData.forEach(item => this.selections.push(item));
                this.update(false);
            }
        });
    }

    addProduct(product: Product){
        let selection = this.selections.find(ps => ps.productId == product.productId);
        if(selection){
            selection.quantity++;
        }
        else{
            this.selections.push(new ProductSelection(this, product.productId,
                    product.name, product.price, 1));
        }
        this.update();
    }

    clear(){
        this.selections = [];
        this.update();
    }

    update(storedData: boolean = true){
        this.itemCount = this.selections.map(ps => ps.quantity).reduce((prev, curr) => prev + curr, 0);

        this.totalPrice = this.selections.map(ps => ps.price * ps.quantity).reduce((prev, curr) => prev + curr, 0);
        debugger;
        if(storedData){
            debugger;
            this.repo.storeSessionData("cart", this.selections.map(s => {
                return {
                    productId: s.productId, name: s.name,
                    price: s.price, quantity: s.quantity
                }
            }));
        }
    }
}

export class ProductSelection{

    constructor(public cart: Cart,
        public productId?: number,
        public name?: string,
        public price?: number,
        private qualityValue?: number){}

    get quantity(){
        return this.qualityValue;
    }

    set quantity(newQuality: number){
        this.qualityValue = newQuality;
        this.cart.update();
    }
}
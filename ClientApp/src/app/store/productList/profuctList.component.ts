import { Component } from '@angular/core';
import { Repository } from '../../models/Repository.model';
import { Product } from '../../models/Product.model';
import { Cart } from 'src/app/models/cart.model';


@Component({
    selector: "store-product-list",
    templateUrl: "productList.component.html"
})

export class ProductListComponent{

    constructor(private repo: Repository, private cart: Cart){}

    get products(): Product[]{
        
             if(this.repo.products != null && this.repo.products.length > 0){
                 let currPage= this.repo.paginationObject.currentPage;
                 let pageIndex = (this.repo.paginationObject.currentPage -1) 
                            * this.repo.paginationObject.productPerPage;
                return this.repo.products.slice(pageIndex, pageIndex + this.repo.paginationObject.productPerPage);
             }
        }

    addToCart(product: Product){
        this.cart.addProduct(product);
    }
}
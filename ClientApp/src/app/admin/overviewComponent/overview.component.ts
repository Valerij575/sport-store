import { Component } from "@angular/core";
import { Repository } from 'src/app/models/Repository.model';
import { Product } from 'src/app/models/Product.model';
import { Order } from 'src/app/models/order.model';


@Component({
    templateUrl: "overview.component.html"
})

export class OverviewComponent{

    constructor(private repo: Repository){
    }

    get products(): Product[] {
        return this.repo.products;
    }

    get orders(): Order[] {
        return this.repo.orders;
    }
}
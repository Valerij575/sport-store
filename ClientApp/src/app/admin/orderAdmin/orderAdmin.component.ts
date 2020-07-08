import { Component } from "@angular/core";
import { Repository } from 'src/app/models/Repository.model';
import { Order } from 'src/app/models/order.model';


@Component({
    templateUrl: "orderAdmin.component.html"
})

export class OrderAdminComponent{
    constructor(private repo: Repository){
    }

    get orders(): Order[] {
        return this.repo.orders;
    }

    markShipped(order: Order) {
        this.repo.shipOrder(order);
    }
}
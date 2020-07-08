import { Component } from "@angular/core";
import { Repository } from 'src/app/models/Repository.model';
import { Product } from 'src/app/models/Product.model';
import { Supplier } from 'src/app/models/Supplier.model';


@Component({
    selector: "admin-product-editor",
    templateUrl: "productEditor.component.html"
})

export class ProductEditorComponent{

    constructor(private repo: Repository){}

    get product(): Product {
        return this.repo.product;
    }

    get suppliers(): Supplier[] {
        return this.repo.suppliers;
    }

    compareSuppliers(s1: Supplier, s2: Supplier){
        return s1&& s2 && s1.name == s2.name;
    }
}
import { Component } from "@angular/core";
import { NavigationService } from 'src/app/models/navigation.service';

@Component({
    selector: "store-categoryFilter",
    templateUrl: "categoryFilter.component.html"
})

export class CategoryFiltersComponent{
    constructor(public service: NavigationService){}
}

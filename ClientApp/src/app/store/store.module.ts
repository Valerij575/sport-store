import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartSummaryComponent } from '../store/cartSummary/cartSummary.component'
import { PaginationComponent } from './pagination/pagination.component';
import { ProductListComponent } from './productList/profuctList.component';
import { ProductSelectionComponent } from './productSelection/productSelection.component';
import { RatingsComponent } from './ratingsComponent/ratings.component';
import { CategoryFiltersComponent } from './categoryFilter/categoryFilter.component';
import { CartDetailComponent } from './cartDetail/cartDetail.component';
import { CheckoutDetailsComponent } from './checkout/checkoutDetails/checkoutDetails.component';
import { CheckoutPaymentComponent } from './checkout/checkoutPayment/checkoutPayment,component';
import { CheckoutSummaryComponent } from './checkout/checkoutSummary/checkoutSummary.component';
import { OrderConfirmationComponent } from './checkout/checkoutConfirmation/orderConfirmation.component';


@NgModule({
    declarations: [CartSummaryComponent, PaginationComponent, CategoryFiltersComponent,
    ProductListComponent, ProductSelectionComponent, RatingsComponent, CartDetailComponent,
    CheckoutDetailsComponent, CheckoutPaymentComponent, CheckoutSummaryComponent, OrderConfirmationComponent],
    imports: [BrowserModule, FormsModule, RouterModule],
    exports: [ProductSelectionComponent]
})

export class StoreModule{

}
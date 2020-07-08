import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { ProductTableComponent } from './structure/productTable.component';
//import { ProductDetailComponent } from './structure/productDetail.component';
import { ProductSelectionComponent } from './store/productSelection/productSelection.component';
import { CartDetailComponent } from './store/cartDetail/cartDetail.component';
import { CheckoutDetailsComponent } from './store/checkout/checkoutDetails/checkoutDetails.component';
import { CheckoutPaymentComponent } from './store/checkout/checkoutPayment/checkoutPayment,component';
import { CheckoutSummaryComponent } from './store/checkout/checkoutSummary/checkoutSummary.component';
import { OrderConfirmationComponent } from './store/checkout/checkoutConfirmation/orderConfirmation.component';


const routes: Routes = [
  //{ path: "table", component: ProductTableComponent},
  //{ path: "detail", component: ProductDetailComponent},
  //{ path: "detail/:id", component: ProductDetailComponent},
  //{ path: "", component: ProductTableComponent}
  { path: "admin", loadChildren: () => import("./admin/admin.module").then(module => module.AdminModule)},
  { path: "checkout/step1", component: CheckoutDetailsComponent },
  { path: "checkout/step2", component: CheckoutPaymentComponent },
  { path: "checkout/step3", component: CheckoutSummaryComponent },
  { path: "checkout/confirmation", component: OrderConfirmationComponent },
  { path: "checkout", redirectTo: "/checkout/step1", pathMatch: "full"},
  { path: "cart", component: CartDetailComponent},
  { path: "store/:category/:page", component: ProductSelectionComponent },
  { path: "store/:categoryOrPage", component: ProductSelectionComponent },
  { path: "store", component: ProductSelectionComponent },
  { path: "", redirectTo: "store/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

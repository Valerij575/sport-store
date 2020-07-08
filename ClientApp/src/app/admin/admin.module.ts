import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { ProductAdminComponent } from './productAdmin/productAdmin.component';
import { OrderAdminComponent } from './orderAdmin/orderAdmin.component';
import { OverviewComponent } from './overviewComponent/overview.component';
import { ProductEditorComponent } from './productEditor/productEditor.component';


const routes: Routes = [
    {
        path: "", component: AdminComponent,
        children: [
            { path: "products", component: ProductAdminComponent },
            { path: "orders", component: OrderAdminComponent },
            { path: "overview", component: OverviewComponent},
            { path: "", component: OverviewComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule, FormsModule, RouterModule.forChild(routes), CommonModule],

    declarations: [AdminComponent, 
            OverviewComponent, 
            ProductAdminComponent, 
            OrderAdminComponent,
            ProductEditorComponent]
})

export class AdminModule{

}
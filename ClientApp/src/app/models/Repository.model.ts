import {Injectable} from "@angular/core"; 
import {HttpClient} from "@angular/common/http";

import { Product } from './Product.model';
import { Filter, Pagination } from './configClasses.repository';
import { Supplier } from './Supplier.model';
import { Observable } from 'rxjs';
import { Order, OrderConfirmation } from './order.model';

const productsUrl = "/api/products";
const suppliersUrl = "/api/suppliers";
const sessionUrl = "/api/session";
const orderUrl = "/api/orders";

type productsMetadata = {
    data: Product[],
    categories: string[]
}

@Injectable()
export class Repository{
    product: Product;
    products: Product[];
    suppliers: Supplier[] = [];
    filter: Filter = new Filter();
    paginationObject = new Pagination();
    categories: string[] = [];
    orders: Order[] = [];


    constructor(private http: HttpClient){
        this.filter.related = true;
        //this.getProducts();
    }

    storeSessionData<T>(dataType: string, data: T){
        return this.http.post(`${sessionUrl}/${dataType}`, data)
                .subscribe(responce => { });
    }

    getSessionData<T>(dataType: string): Observable<T> {
        return this.http.get<T>(`${sessionUrl}/${dataType}`);
    }

    getProduct(id: number){
        this.http.get<Product>(`${productsUrl}/${id}`)
        .subscribe(p => this.product = p);
    }

    getProducts(){
        let url = `${productsUrl}?related=${this.filter.related}`;
        if(this.filter.category){
            url += `&category=${this.filter.category}`;
        }
        if(this.filter.search){
            url += `&search=${this.filter.search}`;
        }

        url += "&metadata=true";

        this.http.get<productsMetadata>(url)
        .subscribe(md => {
            this.products = md.data;
            this.categories = md.categories;
        });
        // this.http.get<Product[]>(`${url}`)
        // .subscribe(prods => this.products = prods);
    }

    getSuppliers(){
        this.http.get<Supplier[]>(suppliersUrl).subscribe(supp => this.suppliers = supp);
    }

    createProduct(prod: Product){
        let data = {
            name: prod.name, 
            category: prod.category,
            description: prod.description,
            price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0
        };

        this.http.post<number>(productsUrl, data)
            .subscribe(id => {
                prod.productId = id;
                this.products.push(prod);
            });
    }

    createProductAndSupplier(prod: Product, supp : Supplier){
        let data = {
            name: supp.name,
            city: supp.city,
            state: supp.state
        };

        this.http.post<number>(suppliersUrl, data)
            .subscribe(id => {
                supp.supplierId = id;
                prod.supplier = supp;
                this.suppliers.push(supp);
                if(prod != null){
                    this.createProduct(prod);
                }

            })
    }

    replaceProduct(prod: Product){
        let data = {
            name: prod.name, 
            category: prod.category,
            description: prod.description,
            price: prod.price,
            supplier: prod.supplier ? prod.supplier.supplierId : 0 
        };
        this.http.put(`${productsUrl}/${prod.productId}`, data)
        .subscribe(() => this.getProducts());
    }

    replaceSupplier(supp: Supplier){
        let data = {
            name: supp.name,
            city: supp.city,
            state: supp.state
        };

        this.http.put(`${suppliersUrl}/${supp.supplierId}`, data)
        .subscribe(() => this.getProducts());
    }

    updateProduct(id: number, changes: Map<string, any>){
        let patch = [];
        changes.forEach((value, key) => patch.push({op: "replace", path: key, value: value}));

        this.http.patch(`${productsUrl}/${id}`, patch).subscribe(() => this.getProducts());
    }

    deleteProduct(id: number){
        this.http.delete(`${productsUrl}/${id}`)
        .subscribe(() => this.getProducts());
    }

    deleteSupplier(id: number){
        this.http.delete(`${suppliersUrl}/${id}`).subscribe(() =>{
            this.getProducts();
            this.getSuppliers();
        })
    }

    getOrders(){
        this.http.get<Order[]>(orderUrl)
            .subscribe(data => this.orders = data);
    }

    createOrder(order: Order){
        this.http.post<OrderConfirmation>(orderUrl,{
            name: order.name,
            address: order.address,
            payment: order.payment,
            products: order.products
        }).subscribe(data => {
            order.orderConfirmation = data;
            order.cart.clear();
            order.clear();
        });
    }

    shipOrder(order: Order){
        this.http.post(`${orderUrl}/${order.orderId}`, {})
            .subscribe(() => this.getOrders());
    }
}
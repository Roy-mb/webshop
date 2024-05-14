import {  Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "../shared/models/Order";

@Injectable({
providedIn: 'root'
})
export class OrderService{
    private baseUrl: string = environment.base_url + "/orders";

    constructor(private http: HttpClient){

    }

    public getOrders(): Observable<Order[]>{
        return this.http.get<Order[]>(this.baseUrl);
    }
}
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../shared/models/Category";

@Injectable({
    providedIn: "root"
})

export class CategoryService{
    private baseUrl: string = environment.base_url + "/category";

    constructor(private http: HttpClient){

    }

    public getCategories(): Observable<Category[]>{
        return this.http.get<Category[]>(this.baseUrl);
    }
}

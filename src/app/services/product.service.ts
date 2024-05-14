import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../shared/models/Product';
import { producerAccessed } from '@angular/core/primitives/signals';
import { Category } from '../shared/models/Category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = environment.base_url + "/products"; 

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  public getProductByIndex(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  public updateProductByIndex(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

}
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/Product';
import { producerAccessed } from '@angular/core/primitives/signals';
import { Category } from '../../shared/models/Category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl: string = environment.base_url + "/product";

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

  // getProductById(id: number): Product{
  //   return this.getAll().find(product => product.id == id)!;
  // }

  // getAllProductsBySearchTerm(searchTerm:string): Product  []{
  //   return  this.getAll().filter(product => 
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()));
  // }

  // getAllCategories(): Category[]{
  //   return[
  //     {name: 'All', count: 5},
  //     {name: 'Koptelefoons', count:1},
  //     {name: 'Muizen', count:2},
  //     {name: 'Toetsenborden', count:1},
  //     {name: 'Microfoons', count:1},
  //   ];

  // }

  // getAllProductsByCategory(category: string): Product[]{
  //   return category == "All" ?
  //   this.getAll() : 
  //   this.getAll().filter(product => product.category?.includes(category))
  // }

  // getAll(): Product[]{
  //   return [
  //     {
  //       id: 1,
  //       name: 'Steelseries Apex Pro Mini toetsenbord',
  //       price: 85,
  //       category: ['Toetsenborden'],
  //       imageUrl: '/assets/images/products/apex-pro-mini.jpg',
  //       description: 'De Steelseries Apex Pro Mini is een klein 60% toetsenbord. Dit toetsenbord is perfect voor gamen, maar kan natuurlijk ook gebruikt worden voor andere doeleinden.',
  //     },
  //     {
        
  //       id: 2,
  //       name: 'Razer DeathAdder muis',
  //       price: 48,
  //       category: ['Muizen'],
  //       imageUrl: '/assets/images/products/deathadder.jpg',
  //       description: 'De Razer Deathadder is een muis speciaal gemaakt voor gamers. Deze muis heeft 2 knoppen aan de zijkant en ligt prettig in de hand.',
  //     },
  //     {
  //       id: 3,
  //       name: 'Razer Kraken koptelefoon',
  //       price: 90,
  //       category: ['Koptelefoons'],
  //       imageUrl: '/assets/images/products/Razer-Kraken-Tournament-Edition.jpg',
  //       description: 'De Razer Kraken koptelefoon is een Limited Edition koptelefoon met een geweldige geluidskwaliteit. Deze koptelefoon gaat over de oren en maakt gebruik van surround sound.',
  //     },
  //     {
  //       id: 4,
  //       name: 'Steelseries Rival 3 muis',
  //       price: 85,
  //       category: ['Muizen'],
  //       imageUrl: '/assets/images/products/Rival-3.jpg',
  //       description: 'De Steelseries Rival 3 muis is een goede muis voor gamers. De muis voelt prettig in de hand, en via de speciale software kunnen de instellingen aangepast worden.',
  //     },
  //     {
  //       id: 5,
  //       name: 'Shure SM7B microfoon',
  //       price: 420,
  //       category: ['Microfoons'],
  //       imageUrl: '/assets/images/products/shuresm7b.jpg',
  //       description: 'De Shure SM7B microfoon is één van de beste microfoons voor particulieren. Deze microfoon wordt gebruikt door de beste streamers. De instellingen kunnen tot op de kleinste details worden aangepast.',
  //     },
  //   ]

  // }
}

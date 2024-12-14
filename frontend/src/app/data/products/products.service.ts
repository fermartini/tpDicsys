import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private url = 'http://localhost:3307/api/productos/';
  private categoriasUrl = 'http://localhost:3307/api/categorias/'; 

  constructor(private http:HttpClient) {
    
  }
  public getProducts() {
    return this.http.get(this.url)
  }
  public getProductsWithCategory(id:number) {
    return this.http.get(`${this.url}${id}`)
  }

  public getCategoryById(id: number) {
    return this.http.get(`${this.categoriasUrl}${id}`);
  }

  public createProduct(product: any) {
    
    return this.http.post(this.url, product);
  }

  public updateProduct(id: number, product: any) {
    return this.http.put(`${this.url}/${id}`, product);
  }
  

  public deleteProduct(id:number) {
    return this.http.delete(`${this.url}${id}`)
  }
}

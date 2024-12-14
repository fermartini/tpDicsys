import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private url = 'http://localhost:3307/api/categorias/'; 
  constructor(private http:HttpClient) { }

  public getCategories(){
    return this.http.get('http://localhost:3307/api/categorias')
  }

  public createCategory(category: any) {
    
    return this.http.post(this.url, category);
  }

  public updateCategory(id: number, category: any) {
    return this.http.put(`${this.url}/${id}`, category);
  }
}

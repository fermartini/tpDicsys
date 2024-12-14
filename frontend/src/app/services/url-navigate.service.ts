import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlNavigateService {

  constructor(private router: Router) { }
  //metodo para navegar sin pasar datos
  navegateUrl(url: string) {
    this.router.navigateByUrl(url)
  }

  //metodo para navegar pasando datos

  navegateUrlWhithData(url: string, params: any) {
    this.router.navigateByUrl(url, params);
  }
  
}

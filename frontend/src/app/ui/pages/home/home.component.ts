import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { GlobalText } from '../../../data/text';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { CategoryComponent } from "../../components/category/category.component";
import { CategoriesService } from '../../../data/categories/categories.service';
import { UrlNavigateService } from '../../../services/url-navigate.service';
import { GlobalUrl } from '../../../data/url';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CategoryComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories: any
  constructor(
    public GlobalText: GlobalText,
    public categoriesService: CategoriesService,
    public urlNavigateService: UrlNavigateService,
    public globalUrl: GlobalUrl
  ) {
    this.categoriesService.getCategories().subscribe((result)=>{
      this.categories = result
    })
   }

   navegateProducts(category: any){

    this.urlNavigateService.navegateUrlWhithData(this.globalUrl.products, {
      state: {
        categoriaId: category.id,
        nombreCategoria: category.nombre  
      }
    });

   }
}

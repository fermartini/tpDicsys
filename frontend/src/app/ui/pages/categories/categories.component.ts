import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { CategoriesService } from '../../../data/categories/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, HeaderComponent, FooterComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  public category: any
  constructor(
    public globalText: GlobalText,
    public router: Router,
    public categoriesService: CategoriesService
  ){
      
      this.categoriesService.getCategories().subscribe((result) => {
        this.category = result;
      });
  }

}

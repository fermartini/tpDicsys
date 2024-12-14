import { Routes } from '@angular/router';
import { HomeComponent } from './ui/pages/home/home.component';
import { ProductsComponent } from './ui/pages/products/products.component';
import { CategoriesComponent } from './ui/pages/categories/categories.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'productos',
        component: ProductsComponent,
    },
    {
        path: 'categorias',
        component: CategoriesComponent,
    }
];

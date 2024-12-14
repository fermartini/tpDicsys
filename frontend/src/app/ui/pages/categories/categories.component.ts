import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { CategoriesService } from '../../../data/categories/categories.service';
import Swal from 'sweetalert2';
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

public openCategoryForm(categoryEdit: any = null) {
    const isEdit = !!categoryEdit;
  
    const defoultId = categoryEdit ? categoryEdit.id : '';
    const defaultNombre = categoryEdit ? categoryEdit.nombre : '';
  
    this.categoriesService.getCategories().subscribe((categories) => {
  
      Swal.fire({
        title: isEdit ? 'Modificar Producto' : 'Crear Producto',
        html: `
        <input id="id" class="swal2-input"  value="${defoultId}" disabled>
          <input id="nombre" class="swal2-input" placeholder="Nombre del producto" value="${defaultNombre}">
        `,
        showCancelButton: true,
        confirmButtonText: isEdit ? 'Modificar' : 'Crear',
        preConfirm: () => {
          const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
  
          if (!nombre) {
            Swal.showValidationMessage('Por favor, completa todos los campos obligatorios.');
            return null;
          }
  
          return { nombre };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const category = result.value;
  
          if (isEdit) {
            this.categoriesService.updateCategory(categoryEdit.id, category).subscribe({
              next: () => {
                Swal.fire('Éxito', 'categoria modificado exitosamente.', 'success')
                location.reload();},
              error: () => Swal.fire('Error', 'Hubo un problema al modificar el categoria.', 'error')
            });
          } else {
            this.categoriesService.createCategory(category).subscribe({
              next: () => {
                Swal.fire('Éxito', 'categoria creado exitosamente.', 'success')
                location.reload();},
              error: () => Swal.fire('Error', 'Hubo un problema al crear el categoria.', 'error')
            });
          }
        }
      });
    });
  }

}

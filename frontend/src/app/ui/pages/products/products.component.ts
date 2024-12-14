import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { GlobalText } from '../../../data/text';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { ProductsService } from '../../../data/products/products.service';
import { CategoriesService } from '../../../data/categories/categories.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, HeaderComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  public idCategoria;
  public nombreCategoria;
  public products: any;
  public categories: any;

  constructor(
    public globalText: GlobalText,
    public router: Router,
    public productsService: ProductsService,
    public categoriesService: CategoriesService
  ) {
    const navigability = this.router.getCurrentNavigation();
    if (navigability && navigability.extras && navigability.extras.state){
      this.idCategoria = navigability.extras.state['categoriaId']; // Cambio aquí
      
      this.nombreCategoria = navigability.extras.state['nombreCategoria'];
      
      this.productsService.getProductsWithCategory(this.idCategoria).subscribe((result) => {
        this.products = result;
        this.getCategoryNamesForProducts(this.products);
      });
    } else{
      this.productsService.getProducts().subscribe((result) => {
        this.products = result;
        this.getCategoryNamesForProducts(this.products);
      })
    }
  }

  //ponerle nombre a la categoria. SIRVE PARA CUANDO TRAE TODOS LOS PRODUCTOS
  private getCategoryNamesForProducts(products: any[]) {
    const categoryRequests = products.map(product => {
      this.productsService.getCategoryById(product.id_categoria).subscribe(response => {
      });
      return this.productsService.getCategoryById(product.id_categoria);
    });
  
    forkJoin(categoryRequests).subscribe((categories: any[]) => {
      console.log('Categorías obtenidas:', categories);
      products.forEach((product, index) => {
        product.nombreCategoria = categories[index][0]?.nombre || 'Categoría desconocida'; // Ajusta si el nombre no está presente
      });
    });
  }
  
  public deleteProduct(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productsService.deleteProduct(id).subscribe(
        (result) => {
          console.log('Producto eliminado correctamente:', result);
          location.reload();
        },
        (error) => {
          console.error('Error al eliminar el producto:', error);
        }
      );
    } else {
      console.log('Eliminación cancelada por el usuario.');
    }
  }
  
  public openProductForm(productToEdit: any = null) {
    // Si `productToEdit` es null, asumimos que es una creación de producto.
    const isEdit = !!productToEdit;
  
    // Prellenar los campos si estamos editando
    const defaultNombre = productToEdit ? productToEdit.nombre : '';
    const defaultDescripcion = productToEdit ? productToEdit.descripcion : '';
    const defaultPrecio = productToEdit ? productToEdit.precio : '';
    const defaultStock = productToEdit ? productToEdit.stock : '';
    const defaultCategoria = productToEdit ? productToEdit.id_categoria : '';
    const defaultEstado = productToEdit ? productToEdit.estado : '1';
  
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
  
      Swal.fire({
        title: isEdit ? 'Modificar Producto' : 'Crear Producto',
        html: `
          <input id="nombre" class="swal2-input" placeholder="Nombre del producto" value="${defaultNombre}">
          <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción del producto">${defaultDescripcion}</textarea>
          <input id="precio" class="swal2-input" placeholder="Precio" type="number" min="1" value="${defaultPrecio}">
          <input id="stock" class="swal2-input" placeholder="Stock" type="number" min="1" value="${defaultStock}">
          <select id="categoria" class="swal2-select">
            <option value="" disabled ${!defaultCategoria ? 'selected' : ''}>Selecciona una categoría</option>
            ${this.categories.map((category: any) => `
              <option value="${category.id}" ${defaultCategoria === category.id ? 'selected' : ''}>${category.nombre}</option>
            `).join('')}
          </select>
          <select id="estado" class="swal2-select">
            <option value="1" ${defaultEstado === '1' ? 'selected' : ''}>Activo</option>
            <option value="0" ${defaultEstado === '0' ? 'selected' : ''}>Inactivo</option>
          </select>
        `,
        showCancelButton: true,
        confirmButtonText: isEdit ? 'Modificar' : 'Crear',
        preConfirm: () => {
          const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
          const descripcion = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
          const precio = (document.getElementById('precio') as HTMLInputElement).value;
          const stock = (document.getElementById('stock') as HTMLInputElement).value;
          const id_categoria = (document.getElementById('categoria') as HTMLSelectElement).value;
          const estado = (document.getElementById('estado') as HTMLSelectElement).value;
  
          if (!nombre || !precio || !stock || !id_categoria) {
            Swal.showValidationMessage('Por favor, completa todos los campos obligatorios.');
            return null;
          }
  
          return { nombre, descripcion, precio: +precio, stock: +stock, id_categoria: +id_categoria, estado: +estado };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const product = result.value;
  
          if (isEdit) {
            // Si es una edición, llamar al servicio de actualización
            this.productsService.updateProduct(productToEdit.id, product).subscribe({
              next: () => Swal.fire('Éxito', 'Producto modificado exitosamente.', 'success'),
              error: () => Swal.fire('Error', 'Hubo un problema al modificar el producto.', 'error')
            });
          } else {
            // Si es una creación, llamar al servicio de creación
            this.productsService.createProduct(product).subscribe({
              next: () => Swal.fire('Éxito', 'Producto creado exitosamente.', 'success'),
              error: () => Swal.fire('Error', 'Hubo un problema al crear el producto.', 'error')
            });
          }
        }
      });
    });
  }
  

  
}

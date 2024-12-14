import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalText } from '../../../data/text';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  @Input() nameCategory: string = '';
  @Input() iconCategory: string = '';

  @Output() categoryClicked = new EventEmitter<string>();

  handleClick() {
    this.categoryClicked.emit(this.nameCategory);
  }
    
}

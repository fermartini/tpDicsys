import { Component } from '@angular/core';
import { GlobalText } from '../../../data/text';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  constructor(
    public GlobalText: GlobalText)
    {      }
}

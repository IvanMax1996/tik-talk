import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {
  SidebarComponent
} from '../../../pages/sidebar/components/sidebar.component'

@Component({
  selector: 'tt-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {}

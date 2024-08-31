import {Component, Input} from "@angular/core"

@Component({
  selector: 'tt-tags',
  standalone: true,
  imports: [],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {
  @Input() tag!: string
  @Input() isActive: boolean = false
}

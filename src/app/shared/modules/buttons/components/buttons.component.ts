import { Component, Input } from '@angular/core'
import { NgClass } from '@angular/common'
import { SvgComponent } from '../../svg/svg.component'

@Component({
  selector: 'tt-buttons',
  standalone: true,
  imports: [
    NgClass,
    SvgComponent
  ],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  @Input() countButton: number = 1
  @Input() titleButton: string = 'Написать'
  @Input() isOffsetButtonIcon!: boolean

}

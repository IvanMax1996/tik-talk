import {Component, Input} from '@angular/core'

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: `
    <svg:use [attr.href]="href" [attr.width]="widthIcon" [attr.height]="heightIcon"></svg:use>
  `,
  styles: ['']
})
export class SvgComponent {
  @Input() icon: string = ''
  @Input() width: string | number = ''
  @Input() height: string | number = ''

  get href(): string {
    return `/assets/images/icons/${this.icon}.svg#${this.icon}`
  }

  get widthIcon(): number {
    this.width = +this.width
    return this.width
  }

  get heightIcon(): number {
    this.height = +this.height
    return this.height
  }
}


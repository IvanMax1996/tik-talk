import { Component, Input, input, InputSignal } from '@angular/core';
import { ImageUrlPipe } from '../../shared/pipes/image-url.pipe';

@Component({
  selector: 'tt-avatar-circle',
  standalone: true,
  imports: [ImageUrlPipe],
  templateUrl: './avatar-circle.component.html',
  styleUrl: './avatar-circle.component.scss'
})
export class AvatarCircleComponent {
  @Input() size?: number

  avatarUrl: InputSignal<string | null | undefined> = input<string | null>()
}

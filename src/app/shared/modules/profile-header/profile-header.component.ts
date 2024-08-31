import { Component, Input, input, InputSignal } from '@angular/core'
import { GetAccountsInterface } from '../../types/getAccounts.interface'
import { ImageUrlPipe } from '../../pipes/image-url.pipe'
import { RouterLink } from '@angular/router'
import { SvgComponent } from '../svg/svg.component'
import { AvatarCircleComponent } from '../../../common-ui/avatar-circle/avatar-circle.component'

@Component({
  selector: 'tt-profile-header',
  standalone: true,
  imports: [
    ImageUrlPipe,
    RouterLink,
    SvgComponent,
    AvatarCircleComponent
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile: InputSignal<GetAccountsInterface | undefined> = input<GetAccountsInterface>()
  @Input() isSettingsButton: boolean = true
}

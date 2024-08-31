import { Component, inject, Input } from '@angular/core'
import { map, Observable } from 'rxjs'
import { GetAccountsInterface } from '../../shared/types/getAccounts.interface'
import { ProfileService } from '../../shared/services/profile.service'
import { AsyncPipe } from '@angular/common'
import {
  SubscriberCardComponent
} from '../subscriber-card/components/subscriber-card.component'
import { PageableInterface } from '../../shared/types/pageable.interface'
import { SvgComponent } from '../../shared/modules/svg/svg.component'
import { RouterLink } from '@angular/router'
import { TagsComponent } from '../../shared/modules/tags/components/tags.component'

@Component({
  selector: 'tt-profile-right-content',
  standalone: true,
  imports: [
    AsyncPipe,
    SubscriberCardComponent,
    SvgComponent,
    RouterLink,
    TagsComponent
  ],
  templateUrl: './profile-right-content.component.html',
  styleUrl: './profile-right-content.component.scss'
})
export class ProfileRightContentComponent {
  @Input() profile!: GetAccountsInterface

  profileService:ProfileService = inject(ProfileService)
  subscribers$: Observable<GetAccountsInterface[]> = this.profileService.getSubscribersList(6)
  totalSubscribe$: Observable<number> = this.profileService.getSubscribers().pipe(
    map((res: PageableInterface<GetAccountsInterface>) => {
      return res.total
    })
  )
}

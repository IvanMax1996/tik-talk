import { Component, inject } from '@angular/core'
import {
  ProfileHeaderComponent
} from '../../../shared/modules/profile-header/profile-header.component'
import { ProfileService } from '../../../shared/services/profile.service'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Observable, switchMap } from 'rxjs'
import { toObservable } from '@angular/core/rxjs-interop'
import { GetAccountsInterface } from '../../../shared/types/getAccounts.interface'
import { AsyncPipe } from '@angular/common'
import { SvgComponent } from '../../../shared/modules/svg/svg.component'
import {
  ProfileRightContentComponent
} from '../../profile-right-content/profile-right-content.component'
import { PostFeedComponent } from '../post-feed/post-feed.component'

@Component({
  selector: 'tt-profile',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    SvgComponent,
    RouterLink,
    ProfileRightContentComponent,
    PostFeedComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileService: ProfileService = inject(ProfileService)
  route: ActivatedRoute = inject(ActivatedRoute)
  meAccount$: Observable<GetAccountsInterface | null> = toObservable(this.profileService.meAccount)

  profile$: Observable<GetAccountsInterface | null> = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') return this.meAccount$

        return this.profileService.getAccount(id)
      })
    )
}

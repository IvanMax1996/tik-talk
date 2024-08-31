import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { SvgComponent } from '../../../shared/modules/svg/svg.component'
import { RouterLink, RouterLinkActive } from '@angular/router'
import {
  SubscriberCardComponent
} from '../../subscriber-card/components/subscriber-card.component'
import {
  ProfileService
} from '../../../shared/services/profile.service'
import { AsyncPipe} from '@angular/common'
import { GetAccountsInterface } from '../../../shared/types/getAccounts.interface'
import { firstValueFrom, Observable } from 'rxjs'
import { ImageUrlPipe } from '../../../shared/pipes/image-url.pipe'

@Component({
  selector: 'tt-sidebar',
  standalone: true,
  imports: [
    SvgComponent,
    RouterLink,
    SubscriberCardComponent,
    AsyncPipe,
    ImageUrlPipe,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  profileService: ProfileService = inject(ProfileService)
  subscribers$: Observable<GetAccountsInterface[]> = this.profileService.getSubscribersList(3)
  meAccount: WritableSignal<GetAccountsInterface | null> = this.profileService.meAccount

  menuItems: menuItemInterface[] = [
    {
      label: 'Моя страница',
      icon: 'home-icon',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'message-icon',
      link: 'chats',
      countMessage: 25
    },
    {
      label: 'Поиск',
      icon: 'search-icon',
      link: 'search',
    }
  ]

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe()).then()
  }
}

export interface menuItemInterface {
  label: string,
  icon: string,
  link: string,
  countMessage?: number
}

import { Component, Input, OnInit } from '@angular/core'
import { GetAccountsInterface } from '../../../shared/types/getAccounts.interface'
import { ImageUrlPipe } from '../../../shared/pipes/image-url.pipe'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'tt-subscriber-card',
  standalone: true,
  imports: [
    ImageUrlPipe,
    RouterLink
  ],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent implements OnInit {
  @Input() profile!: GetAccountsInterface
  @Input() isNameSubscribe: boolean = false
  @Input() sizeIcon: number = 32


  ngOnInit(): void {

  }
}

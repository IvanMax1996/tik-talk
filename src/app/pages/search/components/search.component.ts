import {Component } from '@angular/core'
import {
  ProfileCardComponent
} from '../../../shared/modules/profile-card/components/profile-card.component'
import {
  ProfileService
} from '../../../shared/services/profile.service'
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component'

@Component({
  selector: 'tt-search',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  constructor(private profileService: ProfileService) {}

  profiles = this.profileService.filteredProfiles
}

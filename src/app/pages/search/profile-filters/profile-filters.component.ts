import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { SvgComponent } from '../../../shared/modules/svg/svg.component'
import { ProfileService } from '../../../shared/services/profile.service'
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs'

@Component({
  selector: 'tt-profile-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SvgComponent
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnInit, OnDestroy {
  formFilter!: FormGroup
  formFilterSub!: Subscription
  profileService: ProfileService = inject(ProfileService)
  constructor(private fb: FormBuilder) {}

  initializeForm(): void {
    this.formFilter = this.fb.group({
      firstName: [''],
      lastName: [''],
      stack: ['']
    })
  }

  ngOnInit(): void {
    this.initializeForm()

    this.formFilterSub = this.formFilter.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        })
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.formFilterSub.unsubscribe()
  }
}

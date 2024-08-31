import {
  AfterViewInit,
  Component,
  effect,
  inject,
  OnInit,
  ViewChild,
  WritableSignal
} from '@angular/core'
import {
  ProfileHeaderComponent
} from '../../shared/modules/profile-header/profile-header.component'
import { ProfileService } from '../../shared/services/profile.service'
import { firstValueFrom, Observable } from 'rxjs'
import { GetAccountsInterface } from '../../shared/types/getAccounts.interface'
import { toObservable } from '@angular/core/rxjs-interop'
import { AsyncPipe } from '@angular/common'
import { ImageUrlPipe } from '../../shared/pipes/image-url.pipe'
import { SvgComponent } from '../../shared/modules/svg/svg.component'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { AvatarUploadComponent } from '../avatar-upload/avatar-upload.component'

@Component({
  selector: 'tt-settings',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    ImageUrlPipe,
    SvgComponent,
    ReactiveFormsModule,
    RouterLink,
    AvatarUploadComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  form!: FormGroup
  profileService: ProfileService = inject(ProfileService)
  meAccountSignal: WritableSignal<GetAccountsInterface | null>  = this.profileService.meAccount
  meAccount$: Observable<GetAccountsInterface | null> = toObservable(this.meAccountSignal)

  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent

  constructor(private fb: FormBuilder) {
    effect(() => {
      this.form.patchValue({
        ...this.meAccountSignal(),
        stack: this.mergeStack(this.meAccountSignal()?.stack)
      })
    })
  }

  initializeForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: [{value: '', disabled: true}, [Validators.required]],
      description: [''],
      stack: [''],
    })
  }

  onSave(): void {
    const avatarFile: File | null = this.avatarUploader.avatar

    this.form.markAsTouched()
    this.form.updateValueAndValidity()

    if (this.form.invalid) return

    const stackString: string = this.form.value.stack.replaceAll(' ', '').replaceAll(',', ', ')

    const profileRequest = {
      ...this.form.value,
      stack: this.splitStack(stackString)
    }

    if (avatarFile) {
      firstValueFrom(this.profileService.uploadAvatar(avatarFile)).then()
    }

    firstValueFrom(this.profileService.patchProfile(profileRequest)).then()
  }

  splitStack(stack: string | null | string[]): string[] {
    if (!stack) return []
    if (Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined): string {
    if (!stack) return  ''
    if (Array.isArray(stack)) return stack.join(',')

    return stack
  }

  ngOnInit(): void {
    this.initializeForm()
  }
}

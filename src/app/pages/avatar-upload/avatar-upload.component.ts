import { Component, inject, signal, WritableSignal } from '@angular/core'
import { GetAccountsInterface } from '../../shared/types/getAccounts.interface'
import { Observable } from 'rxjs/internal/Observable'
import { toObservable } from '@angular/core/rxjs-interop'
import { ProfileService } from '../../shared/services/profile.service'
import { ImageUrlPipe } from '../../shared/pipes/image-url.pipe'
import { SvgComponent } from '../../shared/modules/svg/svg.component'
import { AsyncPipe } from '@angular/common'
import { DndDirective } from '../../common-ui/directives/dnd.directive'

@Component({
  selector: 'tt-avatar-upload',
  standalone: true,
  imports: [
    ImageUrlPipe,
    SvgComponent,
    AsyncPipe,
    DndDirective
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})
export class AvatarUploadComponent {
  profileService: ProfileService = inject(ProfileService)
  meAccountSignal: WritableSignal<GetAccountsInterface | null>  = this.profileService.meAccount
  meAccount$: Observable<GetAccountsInterface | null> = toObservable(this.meAccountSignal)
  preview: WritableSignal<string> | any = signal<string>('')
  avatar: File | null = null
  isAvatar: boolean = false

  fileBrowserHandler(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0]

    this.processFile(file)
  }

  onFileDropped(file: File) {
    this.processFile(file)
  }

  processFile(file: File): void {
    if (!file || !file.type.match('image')) return

    const fileReader: FileReader = new FileReader()

    fileReader.readAsDataURL(file)

    fileReader.onload = (event: ProgressEvent<FileReader>): void => {
      this.preview.set(event.target!.result!.toString())
    }

    this.avatar = file
    this.isAvatar = true
  }
}

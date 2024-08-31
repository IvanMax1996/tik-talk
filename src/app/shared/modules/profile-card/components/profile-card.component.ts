import {Component, Input} from "@angular/core"
import {TagsComponent} from "../../tags/components/tags.component"
import {ButtonsComponent} from "../../buttons/components/buttons.component"
import {GetAccountsInterface} from "../../../types/getAccounts.interface"
import {ImageUrlPipe} from "../../../pipes/image-url.pipe"

@Component({
  selector: "tt-profile-card",
  standalone: true,
  imports: [
    TagsComponent,
    ButtonsComponent,
    ImageUrlPipe
  ],
  templateUrl: "./profile-card.component.html",
  styleUrl: "./profile-card.component.scss"
})
export class ProfileCardComponent {
  @Input() profile!: GetAccountsInterface
}

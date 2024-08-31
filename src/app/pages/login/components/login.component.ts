import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core'
import {
  ButtonsComponent
} from '../../../shared/modules/buttons/components/buttons.component'
import {Router, RouterLink} from '@angular/router'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import {LoginService} from '../services/login.service'
import {AuthResponseInterface} from '../types/authResponse.interface'
import {NgClass} from '@angular/common'
import { SvgComponent } from '../../../shared/modules/svg/svg.component'

@Component({
  selector: 'tt-login',
  standalone: true,
  imports: [
    ButtonsComponent,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    SvgComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  router: Router = inject(Router)

  isPasswordVisible: WritableSignal<boolean> = signal<boolean>(false)

  constructor(private fb: FormBuilder, private loginService: LoginService) {
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s,-]{6,}')]]
    })
  }

  onSubmit(): void {
    if (this.form.valid) {

      this.loginService.login(this.form.value).subscribe((response: AuthResponseInterface): void => {
        this.router.navigate(['']).then(() => console.log(response))
      })
    }
  }

  ngOnInit(): void {
    this.initializeForm()
  }
}

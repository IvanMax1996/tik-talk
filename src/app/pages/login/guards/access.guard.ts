import {inject} from '@angular/core'
import {LoginService} from '../services/login.service'
import {Router, UrlTree} from '@angular/router'

export const canActivateAuth = (): boolean | UrlTree => {
  const isLoggedIn: boolean = inject(LoginService).isAuth

  if (isLoggedIn) return true
  return inject(Router).createUrlTree(['/login'])
}

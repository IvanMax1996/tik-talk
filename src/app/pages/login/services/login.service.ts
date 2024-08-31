import {inject, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {LoginRequestInterface} from '../types/loginRequest.interface'
import {environment} from '../../../../environments/environment'
import {catchError, Observable, tap, throwError} from 'rxjs'
import {AuthResponseInterface} from '../types/authResponse.interface'
import {CookieService} from 'ngx-cookie-service'
import {Router} from '@angular/router'
import {AuthRefreshTokenInterface} from '../types/authRefreshToken.interface'

@Injectable()
export class LoginService {
  token: string | null = null
  refreshToken: string | null = null
  cookieService: CookieService = inject(CookieService)
  router: Router = inject(Router)

  constructor(private http: HttpClient) {
  }

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshToken')
    }

    return !!this.token
  }

  login(payload: LoginRequestInterface): Observable<AuthResponseInterface> {
    const url: string = environment.apiUrl + 'auth/token'
    const formData: FormData = new FormData()

    formData.append('username', payload.username)
    formData.append('password', payload.password)

    return this.http.post<AuthResponseInterface>(url, formData)
      .pipe(
        tap((value: AuthResponseInterface): void => this.saveTokens(value))
      )
  }

  refreshLoginToken(): Observable<AuthResponseInterface> {
    const url: string = environment.apiUrl + 'auth/refresh'
    const body: AuthRefreshTokenInterface = {
      refresh_token: this.refreshToken
    }

    return this.http.post<AuthResponseInterface>(url, body)
      .pipe(
        tap((res: AuthResponseInterface): void => this.saveTokens(res)),
        catchError(error => {
          this.logout()

          return throwError(() => new Error(error))
        })
      )
  }

  logout(): void {
    this.cookieService.deleteAll()
    this.token = null
    this.refreshToken = null
    this.router.navigate(['/login']).then()
  }

  saveTokens(res: AuthResponseInterface): void {
    this.token = res.access_token
    this.refreshToken = res.refresh_token

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }
}

import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http'
import {inject} from '@angular/core'
import {LoginService} from '../services/login.service'
import {catchError, Observable, switchMap, throwError} from 'rxjs'
import {AuthResponseInterface} from '../types/authResponse.interface'
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject'
import { filter } from 'rxjs/internal/operators/filter'
import { tap } from 'rxjs/internal/operators/tap'

let isRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
export const loginInterceptor: HttpInterceptorFn =
  (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const loginService: LoginService = inject(LoginService)
    let token: string | null = loginService.token

    if (!token) return next(req)

    if (isRefreshing$.value) {
     return refreshAndProceed(loginService, req, next)
    }

    return next(addToken(req, token)).pipe(
      catchError(error => {
        if (error.status === 403) {
          return refreshAndProceed(loginService, req, next)
        }

        return throwError(() => new Error(error))
      })
    )
}

const refreshAndProceed =
  (loginService: LoginService, req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  if (!isRefreshing$.value) {
    isRefreshing$.next(true)

    return loginService.refreshLoginToken()
      .pipe(
        switchMap((res: AuthResponseInterface) => {
          return next(addToken(req, res.access_token))
            .pipe(
              tap(() => isRefreshing$.next(false))
            )
        })
      )
  }

  if (req.url.includes('refresh')) return next(addToken(req, loginService.token))

  return isRefreshing$.pipe(
    filter((isRefreshing: boolean) => !isRefreshing),
    switchMap((res: boolean) => {
      return next(addToken(req, loginService.token))
    })
  )
}

const addToken = (req: HttpRequest<any>, token: string | null): HttpRequest<any> => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}

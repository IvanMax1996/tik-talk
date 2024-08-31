import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'

import { provideHttpClient, withInterceptors } from '@angular/common/http'
import { LoginService } from './pages/login/services/login.service'
import { loginInterceptor } from './pages/login/interceptors/login.interceptor'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([loginInterceptor])),
    LoginService,
    provideRouter(routes)
  ]
}

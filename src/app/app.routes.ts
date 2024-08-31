import { Routes } from '@angular/router'
import { LoginComponent } from './pages/login/components/login.component'
import { SearchComponent } from './pages/search/components/search.component'
import { LayoutComponent } from './common-ui/layout/components/layout.component'
import {
  ProfileComponent
} from './pages/profile/components/profile.component'
import { canActivateAuth } from './pages/login/guards/access.guard'
import { SettingsComponent } from './pages/settings/settings.component'

export const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'search', component: SearchComponent }
    ],
    canActivate: [canActivateAuth]
  },
  { path: 'login', component: LoginComponent }
]

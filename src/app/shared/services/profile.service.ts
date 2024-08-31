import { inject, Injectable, signal, WritableSignal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { GetAccountsInterface } from '../types/getAccounts.interface'
import { map, Observable, tap } from 'rxjs'
import { PageableInterface } from '../types/pageable.interface'

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http: HttpClient = inject(HttpClient)
  filteredProfiles = signal<GetAccountsInterface[]>([])
  meAccount: WritableSignal<GetAccountsInterface | null> = signal<GetAccountsInterface | null>(null)

  constructor() {
  }

  getTestAccounts(): Observable<GetAccountsInterface[]> {
    const url: string = environment.apiUrl + 'account/test_accounts'

    return this.http.get<GetAccountsInterface[]>(url)
  }

  getMe(): Observable<GetAccountsInterface> {
    const url: string = environment.apiUrl + 'account/me'

    return this.http.get<GetAccountsInterface>(url)
      .pipe(
        tap((res: GetAccountsInterface): void => {
          this.meAccount.set(res)
        })
      )
  }

  getAccount(id: string): Observable<GetAccountsInterface> {
    const url: string = environment.apiUrl + `account/${id}`

    return this.http.get<GetAccountsInterface>(url)
  }

  getSubscribersList(countSubscribers: number = 0): Observable<GetAccountsInterface[]> {
    const url: string = environment.apiUrl + 'account/subscribers/'

    return this.http.get<PageableInterface<GetAccountsInterface>>(url)
      .pipe(
        map((
          res: PageableInterface<GetAccountsInterface>): GetAccountsInterface[] => res.items.slice(0, countSubscribers)
        )
      )
  }

  getSubscribers(): Observable<PageableInterface<GetAccountsInterface>> {
    const url: string = environment.apiUrl + 'account/subscribers/'

    return this.http.get<PageableInterface<GetAccountsInterface>>(url)
  }

  patchProfile(profile: Partial<GetAccountsInterface>): Observable<GetAccountsInterface> {
    const url: string = environment.apiUrl + `account/me`

    return this.http.patch<GetAccountsInterface>(url, profile)
  }

  uploadAvatar(file: File): Observable<GetAccountsInterface> {
    const url: string = environment.apiUrl + `account/upload_image`
    const formData: FormData = new FormData()

    formData.append('image', file)

    return this.http.post<GetAccountsInterface>(url, formData)
  }

  filterProfiles(params: Record<string, any>): Observable<PageableInterface<GetAccountsInterface>> {
    const url: string = environment.apiUrl + `account/accounts`

    return this.http.get<PageableInterface<GetAccountsInterface>>(url, {
      params
    }).pipe(
      tap((res: PageableInterface<GetAccountsInterface>) => {
        this.filteredProfiles.set(res.items.slice(0, 10))
      })
    )
  }
}

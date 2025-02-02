import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../../environments/environment"

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return null
    return `${environment.apiUrl + value}`;
  }
}

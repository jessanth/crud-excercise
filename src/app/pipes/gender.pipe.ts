import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value) {
      return 'Male'
    } else {
      return 'Female'
    }
  }

}

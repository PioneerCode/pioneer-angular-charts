import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringify'
})
export class StringifyPipe implements PipeTransform {
  transform(val) {
    return JSON.stringify(val, null, 2);
  }
}

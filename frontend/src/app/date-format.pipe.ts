import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string, withTime: boolean): string {
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    };

    if (withTime) {
      options['hour'] = '2-digit';
      options['minute'] = '2-digit';
      options['second'] = '2-digit';
    }

    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value));
  }

}

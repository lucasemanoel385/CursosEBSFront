import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatePipe',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any): any {

    let formated = value;

    formated = formatDate(value, 'dd/MM/yyyy', 'pt-BR');

    return formated;
  }

  transformInputDate(value: any): any {

    let formated = value;

    formated = formatDate(value, 'yyyy-MM-dd', 'pt-BR');

    return formated;
  }

  
  /*transform(value: any, format: string = 'dd/MM/yyyy', locale: string = 'pt-BR'): any {
    if (!value) return ''; // Evita erro se o valor for nulo ou indefinido
    return formatDate(value, format, locale);
  }*/

}

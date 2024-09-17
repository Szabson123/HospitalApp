import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value == null) return '';

    // Konwersja wartości na liczbę
    const numericValue = parseFloat(value.toString());
    if (isNaN(numericValue)) return '';

    const hours = Math.floor(numericValue);
    const minutes = Math.round((numericValue - hours) * 60);

    // Formatowanie godzin i minut z wiodącym zerem
    const formattedHours = ('0' + hours).slice(-2);
    const formattedMinutes = ('0' + minutes).slice(-2);

    return `${formattedHours}:${formattedMinutes}`;
  }
}

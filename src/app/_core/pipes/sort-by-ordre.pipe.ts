import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sortByOrder',
})
export class SortByOrdrePipe implements PipeTransform {
    transform(value: any[], ascending = true): any[] {
        return value.sort((a, b) => {
            a = a.sortName.toLowerCase();
            b = b.sortName.toLowerCase();
            return ascending ? a.localeCompare(b) : b.localeCompare(a);
        });
    }
}

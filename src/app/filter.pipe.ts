import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(hotelsData: any[], searchInput:any): any[]  {
    if (!hotelsData || !searchInput) {
      return hotelsData;
    }

    searchInput = searchInput.toLowerCase();
    return hotelsData.filter(hotel => {
      // Modify this condition based on the property you want to search by
      return  JSON.stringify(hotel).toLowerCase().includes(searchInput);
    });


  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtersItems'
})
export class FiltersItemsPipe implements PipeTransform {

  transform(alldata: any[], searchInput:any): any[]  {
    if (!alldata || !searchInput) {
      return alldata;
    }

    searchInput = searchInput.toLowerCase();
    return alldata.filter(hotel => {
      // Modify this condition based on the property you want to search by
      return  JSON.stringify(hotel).toLowerCase().includes(searchInput);
    });


  }

}

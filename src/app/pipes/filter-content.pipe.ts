import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  //naam te gebruiken in html bij piping
  name: 'filterContent'
})

export class FilterContentPipe implements PipeTransform {
  transform(value: any, filterString: number, propName: string): any {
    const resultArray = [];

    //console.log("value in pipe: ", value);
    //console.log("filterString in pipe: ", filterString);
    //console.log("propName in pipe: ", propName);

    //geen data
    if (value.length === 0 ) {
      //console.log("in transform lenght 0 or null");
      return value;
    }

    //lopen in de array die de array met data(ook een array) en een label(string) bevat
    for (const reeks of value) {
      //console.log("reeks[propName]", reeks[propName])
      //console.log("in for loop van value", value);
      const tempArray = [];
      for (const meting in reeks[propName]) {
        //console.log("meting", reeks[propName][meting]);

        //tijdelijke vergelijking: de minimum weergegeven waardes moeten hoger zijn dan de doorgegeven waarde(filterString)
        //die idd nu grappig genoeg een number is, maar nog steeds niet bij loggen in browser.. soit
        if (reeks[propName][meting] > filterString) {
          tempArray.push(reeks[propName][meting]);
        }

      }

      //console.log("tempArray", tempArray);
      //console.log("reeks", reeks);
      //console.log("resultArray in for loop", resultArray);

      reeks[propName] = tempArray;
      resultArray.push(reeks);

    }
    //console.log("resultArray after loop", resultArray);
    return resultArray;

  }
}

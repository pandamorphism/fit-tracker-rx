import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'floor'
})
export class FloorPipe implements PipeTransform {

  transform(value: any, precision: any = 0): any {
    if (typeof precision === 'string') {
      precision = parseInt(precision, 10);
    }

    return createRound('floor')(value, precision);
  }
}

export function createRound(method: string): Function {

  // <any>Math to suppress error
  const func: any = (<any>Math)[method];
  return function (value: number, precision: number = 0) {

    if (typeof precision !== 'number' || isNaN(precision)) {
      precision = 0;
    }

    if (precision) {

      let pair = `${value}e`.split('e');
      const val = func(`${pair[0]}e` + (+pair[1] + precision));

      pair = `${val}e`.split('e');
      return +(pair[0] + 'e' + (+pair[1] - precision));
    }

    return func(value);
  };
}

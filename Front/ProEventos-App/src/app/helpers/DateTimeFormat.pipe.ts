import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../util/constants';

@Pipe({
  name: 'DateFormatPipe'
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!isNaN(value)){

      function pad(n) {
        return n<10 ? '0'+n : n
      }

      const valueData = new Date(value);

      const localDateTime = pad(valueData.getMonth()+1) +
                            "/" +
                            pad(valueData.getDate()) +
                            "/" +
                            valueData.getFullYear() +
                            " " +
                            pad(valueData.getHours()) +
                            ":" +
                            pad(valueData.getMinutes()) +
                            ":" +
                            pad(valueData.getSeconds());

      value = localDateTime;
    } else {

      if ((typeof value !== "undefined") && (value !== "")) {

        const [day, month, year] = value.split('/');

        if (day !== '') {

          let hour = value.substring(11,13);
          let minutes = value.substring(14,16);
          value =  month + '/' + day+ '/' + year ;
          // + ' ' + hour + ':' + minutes;
        }
      }
    }

    // const currentDate = new Date();
    // const enUSFormatter = new Intl.DateTimeFormat('en-US');
    // console.log(enUSFormatter.format(currentDate));
    // console.log(enUSFormatter);

    // console.log(currentDate);

    // console.log(value);

    // const data1 = new Date('2021-04-23T10:00:00.000');

    // let created: string = value;
    // created = created.substring(0, created.indexOf(' GMT'));
    // let dateCreated = new Date(created);
    // console.log(dateCreated);

    // if ((typeof value !== undefined) && (value !== "")) {
    // }

    return super.transform(value, Constants.DATE_TIME_FMT);
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateTimeInput } from '../../models/date-time-input.model';
import moment from 'moment';

@Component({
  selector: 'app-multi-date-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './multi-date-select.component.html',
  styleUrl: './multi-date-select.component.scss'
})
export class MultiDateSelectComponent {

  @Input()
  public dates: DateTimeInput[] = []

  @Output()
  public datesChange: EventEmitter<DateTimeInput[]> = new EventEmitter();


  public removeDate(index: number) {
    if (this.dates.length === 1) return;

    this.dates.splice(index, 1);
  }

  public addDate() {
    if (this.dates.length == 0) {
      this.dates.push(new DateTimeInput(new Date(), new Date()));
    }

    if (this.dates.length < 2 || this.dates[this.dates.length - 1].date === "" || this.dates[this.dates.length - 2].date === "") {
      this.dates.push({
        date: this.dates[this.dates.length - 1].date,
        startTime: this.dates[this.dates.length - 1].startTime,
        endTime: this.dates[this.dates.length - 1].endTime
      });
      return;
    }

    let d1 = new Date(this.dates[this.dates.length - 2].date)
    let d2 = new Date(this.dates[this.dates.length - 1].date)
    let interval = d2.getTime() - d1.getTime();
    let intervalInDays = Math.round(interval / (1000 * 3600 * 24));
    d2.setDate(d2.getDate() + intervalInDays);

    this.dates.push({
      date: moment(d2).format('yyyy-MM-DD'),
      startTime: this.dates[this.dates.length - 1].startTime,
      endTime: this.dates[this.dates.length - 1].endTime
    })
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-time-overview',
  standalone: true,
  imports: [],
  templateUrl: './time-overview.component.html',
  styleUrl: './time-overview.component.scss'
})
export class TimeOverviewComponent {
  public detailInMinutes : number = 60;
  public heightInPixels = 60;

  public times: Date[] = [];
  public day: Date = new Date();

  ngOnInit(): void {
    let currentTime = 0;
    while(currentTime < 25*60){
      let today = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate());
      today.setMinutes(currentTime);
      this.times.push(today);
      currentTime += this.detailInMinutes;
    }
  }
}

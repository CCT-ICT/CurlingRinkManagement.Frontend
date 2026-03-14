import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-time-overview',
  standalone: true,
  imports: [],
  templateUrl: './time-overview.component.html',
  styleUrl: './time-overview.component.scss'
})
export class TimeOverviewComponent implements AfterViewInit {

  public detailInMinutes: number = 60;
  public heightInPixels = 60;

  public times: Date[] = [];
  public day: Date = new Date();

  public scrollToHour:number = 8;
  public scrollToMinute:number = 0;

  ngOnInit(): void {
    let currentTime = 0;
    while (currentTime < 25 * 60) {
      let today = new Date(this.day.getFullYear(), this.day.getMonth(), this.day.getDate());
      today.setMinutes(currentTime);
      this.times.push(today);
      currentTime += this.detailInMinutes;
    }
  }

  ngAfterViewInit(): void {
    console.log(document.getElementById("anchor"));
    document.getElementById("anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

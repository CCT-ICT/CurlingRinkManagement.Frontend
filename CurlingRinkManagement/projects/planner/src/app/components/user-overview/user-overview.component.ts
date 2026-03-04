import { Component, OnInit } from '@angular/core';
import { UserService, ClubService, BasePaginationPageComponent, PaginationControlsComponent } from '../../../../../common-api/src/public-api';
import { UserData } from '../../../../../common-api/src/lib/models/userdata.model';

@Component({
  selector: 'app-user-overview',
  imports: [PaginationControlsComponent],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss'
})
export class UserOverviewComponent extends BasePaginationPageComponent implements OnInit {
  public userData: UserData | undefined;

  constructor(private userService: UserService, private clubService: ClubService) {
    super()
  }

  ngOnInit(): void {
    this.loadEntities();
  }

  override loadEntities(): void {
    var club = this.clubService.getCurrentClub()?.clubAbbriviation;
    if (!club) return;
    this.userService.getAll(club).subscribe({
      next: (data) => {
        this.userData = data;
        this.totalAmount = data.count;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  public currentPageChange(newPage: number) {
    //TODO implement pagination for users
  }

}

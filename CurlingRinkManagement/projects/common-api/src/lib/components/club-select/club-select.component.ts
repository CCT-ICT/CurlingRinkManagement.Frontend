import { Component, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';
import { Club } from '../../models/club.model';

@Component({
  selector: 'lib-club-select',
  imports: [],
  templateUrl: './club-select.component.html',
  styleUrl: './club-select.component.css'
})
export class ClubSelectComponent implements OnInit {
  clubs: Club[] = [];
  constructor(private clubService: ClubService) { }

  ngOnInit(): void {
    this.clubService.getAll().subscribe(clubs => {
      this.clubs = clubs;
      this.checkCurrentClub();
    })
  }



  private checkCurrentClub() {
    let currentClub = this.clubService.getCurrentClub();
    if ((currentClub == null || this.clubs.find(c => c.id === currentClub?.id) == null) && this.clubs.length > 0) {
      this.clubService.setCurrentClub(this.clubs[0]);
    }
  }

  public get currentClubName(): string | null {
    return this.clubService.getCurrentClub()?.clubName ?? null;
  }

  public selectClub(club: Club) {
    this.clubService.setCurrentClub(club);
  }
}

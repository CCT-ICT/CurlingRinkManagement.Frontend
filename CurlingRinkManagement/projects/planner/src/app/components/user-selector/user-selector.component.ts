import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../../../../../common-api/src/lib/models/user.model';
import { ClubService, UserService } from '../../../../../common-api/src/public-api';
import { debounceTime, fromEvent, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-selector',
  imports: [FormsModule],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.scss'
})
export class UserSelectorComponent implements AfterViewInit  {
  @ViewChild('userSearchBox') searchBox: ElementRef | null = null;
  public users: User[] = [];
  public selectedUser: User | null = null;

  @Input()
  public selectedUserId: string | null = null;
  @Output()
  public selectedUserIdChange: EventEmitter<string | null> = new EventEmitter();

  public searchtext: string = "";

  public showContactCreation: boolean = false;

  constructor(private userService: UserService, private clubService: ClubService) { }

  ngAfterViewInit(): void {
    if (this.searchBox === null) return;
    const keyup$ = fromEvent(this.searchBox.nativeElement, 'keyup')

    keyup$.pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(200)
    )
      .subscribe((value: any) => {
        this.searchUsers(value);
      });
    if (this.selectedUserId !== null && this.selectedUserId !== '') {
      this.searchUsers(this.selectedUserId);
    }
  }


  private searchUsers(searchText: string) {
    if (searchText === null || searchText === "" || searchText.replaceAll(" ", "") === "") {
      this.users = [];
      return;
    }
    var club = this.clubService.getCurrentClub()?.clubAbbriviation;
    if (!club) return;
    this.userService.getAll(club, searchText).subscribe((users) => {
      users.users.forEach(user => {
        if(user.identity === this.selectedUserId) {
          this.selectedUser = user;
        }
      });
      this.users = users.users;
    });
  }

  public selectUser(user: User) {
    console.log(user);
    this.selectedUser = user;
    this.selectedUserId = user.identity;
    this.selectedUserIdChange.emit(this.selectedUserId);
    this.searchtext = user.name;
  }

  public clearSelection() {
    this.selectedUser = null;
    this.selectedUserId = null;
    this.selectedUserIdChange.emit(this.selectedUserId);
    this.searchtext = "";
  }
}

import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request.model';
import { ContactModel } from '../../models/contact-model';
import { FormsModule } from '@angular/forms';
import { debounceTime, filter, fromEvent, map, merge } from 'rxjs';
import { RequestEditorComponent } from "../request-editor/request-editor.component";
import { CustomerRequestService } from '../../services/customer-request.service';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-request-selector',
  imports: [FormsModule, RequestEditorComponent],
  templateUrl: './request-selector.component.html',
  styleUrl: './request-selector.component.scss'
})
export class RequestSelectorComponent implements OnInit, OnChanges {
  @ViewChild('requestSearchBox') searchBox: ElementRef | null = null;

  @Input()
  public selectedRequest: CustomerRequest | null = null;

  @Output()
  public selectedRequestChange: EventEmitter<CustomerRequest | null> = new EventEmitter();
  public selectedRequestContact: ContactModel | undefined;

  public selectedRequests: CustomerRequest[] = [];
  public requestContacts: Map<string, ContactModel> = new Map<string, ContactModel>();
  public searchtext: string = "";
  public showRequestCreation: boolean = false;



  constructor(private requestService: CustomerRequestService, private contactService: ContactService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedRequest !== null && this.selectedRequestContact?.id !== this.selectedRequest.contactId) {
      this.contactService.getById(this.selectedRequest.contactId).subscribe((contact) => {
        this.selectedRequestContact = contact;
      });
    }
  }

  ngOnInit(): void {

    if (this.searchBox === null) return;
    const keyup$ = fromEvent(this.searchBox.nativeElement, 'keyup')
    const enterPress$ = fromEvent(this.searchBox.nativeElement, 'keydown').pipe(
      filter((e: any) => e.key === 'Enter')
    );
    merge(keyup$, enterPress$).pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(200)
    )
      .subscribe((value: any) => {
        this.searchRequests(value);
      });
  }


  private searchRequests(searchText: string) {
    if (searchText === null || searchText === "" || searchText.replaceAll(" ", "") === "") {
      this.selectedRequests = [];
      return;
    }
    this.requestService.getAll(null, 5, ["Generic"], [searchText]).subscribe((requests) => {
      this.selectedRequests = requests;
      requests.forEach((request) => {
        this.contactService.getById(request.contactId).subscribe((contact) => {
          this.requestContacts.set(request.id, contact);
        });
      })
    });
  }

  clearSelection() {
    this.selectedRequest = null;
    this.selectedRequestContact = undefined;
    this.selectedRequestChange.emit(this.selectedRequest);
  }

  selectRequest(request: CustomerRequest) {
    this.selectedRequest = request;
    this.selectedRequestContact = this.requestContacts.get(request.id);
    this.selectedRequestChange.emit(this.selectedRequest);

    this.searchtext = this.selectedRequestContact?.firstName + " " + this.selectedRequestContact?.prefix + " " + this.selectedRequestContact?.lastName
  }

  hideRequestCreation() {
    this.showRequestCreation = false;
  }
  requestCreated(request: CustomerRequest) {
    this.selectRequest(request);
    this.showRequestCreation = false;
  }
  addNewRequest() {
    this.showRequestCreation = true;
  }
}

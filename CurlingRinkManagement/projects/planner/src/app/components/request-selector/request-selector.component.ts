import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CustomerRequest } from '../../models/customer-request.model';
import { ContactModel } from '../../models/contact-model';
import { FormsModule } from '@angular/forms';
import { debounceTime, fromEvent, map } from 'rxjs';
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
    const searchBox = document.getElementById('requestSearchBox');
    
    if (searchBox === null) return;
    const keyup$ = fromEvent(searchBox, 'keyup')

    keyup$.pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(200)
    )
      .subscribe((value: any) => {
        this.searchRequests(value);
      });
  }


  private searchRequests(searchText: string) {
    console.log("start searching")
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

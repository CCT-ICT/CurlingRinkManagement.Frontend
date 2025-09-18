import { Component, OnInit } from '@angular/core';
import { BasePaginationPageComponent } from '../../../../../common-api/src/public-api';
import { CustomerRequest, CustomerRequestState } from '../../models/customer-request.model';
import { ContactModel } from '../../models/contact-model';
import { PaginationControlsComponent } from "../../../../../common-api/src/lib/components/pagination-controls/pagination-controls.component";
import { CustomerRequestService } from '../../services/customer-request.service';
import { RequestEditorComponent } from "../request-editor/request-editor.component";
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-request-overview',
  imports: [PaginationControlsComponent, RequestEditorComponent],
  templateUrl: './request-overview.component.html',
  styleUrl: './request-overview.component.scss'
})
export class RequestOverviewComponent extends BasePaginationPageComponent implements OnInit {


  public requests: CustomerRequest[] = [
  ];

  public contacts: Map<string, ContactModel> = new Map<string, ContactModel>([
  ]);

  public expended: string | null = null;
  public showRequestModal: boolean = false;
  public requestToEdit: CustomerRequest | null = null;
  public searchText: string = '';

  constructor(private customerRequestService: CustomerRequestService, private contactService: ContactService) { super() }

  override loadEntities(): void {
    this.customerRequestService.getAll(this.currentPage, this.pageSize).subscribe(requests => {
      this.requests = requests;
      var contactIds = [... new Set(this.requests.map(r => r.contactId))];
      contactIds.forEach(id => {
        this.contactService.getById(id).subscribe(contact => this.contacts.set(id, contact));
      });
    })
  }

  ngOnInit(): void {
    this.loadEntities();
  }

  getContact(id: string | null): ContactModel | undefined {
    if (id === null)
      return undefined;

    return this.contacts.get(id);
  }

  editRequest(request: CustomerRequest) {
    this.showRequestModal = true
    this.requestToEdit = request;
  }

  requestEdited(request: CustomerRequest) {
    this.showRequestModal = false
    if(this.requestToEdit == null) {
      this.requests.push(request);
      return;
    }
    var index = this.requests.indexOf(this.requestToEdit);
    this.requests[index] = request;
    this.requestToEdit = null;
  }

  public expend(id: string) {
    if (id === this.expended)
      this.expended = null;
    else
      this.expended = id;
  }

  public currentPageChange(newPage: number) {
    this.loadEntities();
    this.currentPage = newPage;
  }

  public getEnumString(request: CustomerRequest) {
    return CustomerRequestState[request.customerRequestState]
  }

  public resetForm() {
    this.showRequestModal = false;
    this.requestToEdit = null;
  }
}
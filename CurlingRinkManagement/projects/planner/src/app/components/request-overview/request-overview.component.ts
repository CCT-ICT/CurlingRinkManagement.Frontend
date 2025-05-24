import { Component, OnInit } from '@angular/core';
import { BasePaginationPageComponent } from '../../../../../common-api/src/public-api';
import { CustomerRequest, CustomerRequestState } from '../../models/customer-request.model';
import { ContactModel } from '../../models/contact-model';
import { PaginationControlsComponent } from "../../../../../common-api/src/lib/components/pagination-controls/pagination-controls.component";

@Component({
  selector: 'app-request-overview',
  imports: [PaginationControlsComponent],
  templateUrl: './request-overview.component.html',
  styleUrl: './request-overview.component.scss'
})
export class RequestOverviewComponent extends BasePaginationPageComponent implements OnInit {


  public requests: CustomerRequest[] = [
    {
      id: '',
      clubId: '',
      title: 'Groepsuitje',
      amountOfPeople: 0,
      additionalInfo: '',
      customPriceReason: null,
      customPrice: null,
      customerRequestState: CustomerRequestState.DateInOption,
      contactId: '1'
    },
        {
      id: '',
      clubId: '',
      title: 'Bedrijfsfeestje',
      amountOfPeople: 0,
      additionalInfo: '',
      customPriceReason: null,
      customPrice: null,
      customerRequestState: CustomerRequestState.ConversationStarted,
      contactId: '1'
    },
        {
      id: '',
      clubId: '',
      title: 'Teamuitje',
      amountOfPeople: 0,
      additionalInfo: '',
      customPriceReason: null,
      customPrice: null,
      customerRequestState: CustomerRequestState.DateConfirmed,
      contactId: '1'
    },
        {
      id: '',
      clubId: '',
      title: 'Cursus',
      amountOfPeople: 0,
      additionalInfo: '',
      customPriceReason: null,
      customPrice: null,
      customerRequestState: CustomerRequestState.PaymentReceived,
      contactId: '1'
    },
        {
      id: '',
      clubId: '',
      title: 'Groepsuitje',
      amountOfPeople: 0,
      additionalInfo: '',
      customPriceReason: null,
      customPrice: null,
      customerRequestState: CustomerRequestState.Completed,
      contactId: '1'
    }
  ];

  public contacts: Map<string, ContactModel> = new Map<string, ContactModel>([
    [
    '1',
    {
      id: '1',
      clubId: '',
      firstName: 'Bart',
      prefix: '',
      lastName: 'Klomp',
      email: 'bartpklomp@gmail.com',
      phoneNumber: '',
      additionalInfo: '',
      dateAdded: new Date(),
      tags: [],
    }]
  ]);

  public expended: string | null = null;
  public showContactModal: boolean = false;
  public requestToEdit: CustomerRequest | null = null;
  public searchText: string = '';

  override loadEntities(): void {

  }
  ngOnInit(): void {

  }

  getContact(id: string | null): ContactModel | undefined {
    if (id === null)
      return undefined;

    return this.contacts.get(id);
  }

  editRequest(request: CustomerRequest) {
    throw new Error('Method not implemented.');
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
}
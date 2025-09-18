import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CustomerRequest, CustomerRequestState } from '../../models/customer-request.model';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerRequestService } from '../../services/customer-request.service';
import { ContactSelectorComponent } from "../contact-selector/contact-selector.component";
import { ContactModel } from '../../models/contact-model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-request-editor',
  imports: [ReactiveFormsModule, ContactSelectorComponent],
  templateUrl: './request-editor.component.html',
  styleUrl: './request-editor.component.scss'
})
export class RequestEditorComponent implements OnChanges {
  @Output()
  public successfulAction = new EventEmitter<CustomerRequest>();

  @Output()
  public exit = new EventEmitter();

  @Input()
  public selectedRequest: CustomerRequest | null = null;

  public error: string | null = null;
  public submitted: boolean = false;

  private formBuilder = new FormBuilder();
  public requestForm = this.formBuilder.nonNullable.group({
    title: new FormControl(''),
    amountOfPeople: new FormControl<number>(0),
    additionalInfo: new FormControl(''),
    customPriceReason: new FormControl(''),
    customPrice: new FormControl<number>(-1)
  });
  public currentState: CustomerRequestState = CustomerRequestState.ConversationStarted;
  public showCustomPrice: boolean = false;

  public selectedContact: ContactModel | null = null;

  constructor(private requestService: CustomerRequestService, private contactService: ContactService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedRequest']) {
      this.populateForm();
    }
  }

  private populateForm(): void {
    if (this.selectedRequest) {
      // Fill form with selected contact data
      this.requestForm.patchValue({
        title: this.selectedRequest.title,
        amountOfPeople: this.selectedRequest.amountOfPeople,
        additionalInfo: this.selectedRequest.additionalInfo,
        customPriceReason: this.selectedRequest.customPriceReason,
        customPrice: this.selectedRequest.customPrice
      });
      this.currentState = this.selectedRequest.customerRequestState;
      this.showCustomPrice = this.selectedRequest.customPrice !== null && this.selectedRequest.customPrice > -1;
      this.contactService.getById(this.selectedRequest.contactId).subscribe((contact) => this.selectedContact = contact)
    } else {
      // Reset form when no request is selected
      this.requestForm.reset();
    }

    // Reset form state
    this.submitted = false;
    this.error = null;
  }

  save() {
    this.submitted = true;
    if (this.requestForm.invalid || this.selectedContact == null) return;
    let form = this.requestForm.value;
    let request = new CustomerRequest();
    request.id = this.selectedRequest?.id ?? crypto.randomUUID();
    request.additionalInfo = form.additionalInfo ?? '';
    request.clubId = crypto.randomUUID();
    request.title = form.title ?? '';
    request.amountOfPeople = form.amountOfPeople ?? 0;
    request.additionalInfo = form.additionalInfo ?? '';

    if (this.showCustomPrice) {
      request.customPriceReason = form.customPriceReason ?? '';
      request.customPrice = form.customPrice ?? 0;
    } else {
      request.customPriceReason = null;
      request.customPrice = -1;
    }
    request.customerRequestState = this.currentState ?? 0;

    request.contactId = this.selectedContact.id

    if (this.selectedRequest === null) {
      this.requestService.create(request).subscribe(this.subscriptionHandler);
    } else {
      this.requestService.update(request).subscribe(this.subscriptionHandler);
    }
  }

  private subscriptionHandler: any = {
    next: (a: CustomerRequest) => {
      this.successfulAction.emit(a);
    },
    error: (e: any) => {
      if (e.status === 409) {
        this.error = "E-Mail already exists in the system";
        return;
      }
      this.error = e;
      console.log(e);
    }
  };

  get firstName() {
    return this.requestForm.get('firstName')!;
  }
  get lastName() {
    return this.requestForm.get('lastName')!;
  }

  public get customerRequestState(): typeof CustomerRequestState {
    return CustomerRequestState;
  }
}


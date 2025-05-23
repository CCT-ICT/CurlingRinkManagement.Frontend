import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactModel } from '../../models/contact-model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-editor',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-editor.component.html',
  styleUrl: './contact-editor.component.scss'
})
export class ContactEditorComponent implements OnChanges {
  @Output()
  public successfulAction = new EventEmitter<ContactModel>();

  @Output()
  public exit = new EventEmitter();

  @Input()
  public selectedContact: ContactModel | null = null;

  public error: string | null = null;
  public submitted: boolean = false;

  private formBuilder = new FormBuilder();
  public contactForm = this.formBuilder.nonNullable.group({
    firstName: new FormControl('', Validators.required),
    prefix: new FormControl(''),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    additionalInfo: new FormControl('')
  });

  constructor(private contactService: ContactService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedContact']) {
      this.populateForm();
    }
  }

  private populateForm(): void {
    if (this.selectedContact) {
      // Fill form with selected contact data
      this.contactForm.patchValue({
        firstName: this.selectedContact.firstName || '',
        prefix: this.selectedContact.prefix || '',
        lastName: this.selectedContact.lastName || '',
        email: this.selectedContact.email || '',
        phoneNumber: this.selectedContact.phoneNumber || '',
        additionalInfo: this.selectedContact.additionalInfo || ''
      });
    } else {
      // Reset form when no contact is selected
      this.contactForm.reset();
    }

    // Reset form state
    this.submitted = false;
    this.error = null;
  }

  save() {
    this.submitted = true;
    if (this.contactForm.invalid) return;
    let form = this.contactForm.value;
    let contact = new ContactModel();
    contact.id = this.selectedContact?.id ?? crypto.randomUUID();
    contact.dateAdded = this.selectedContact?.dateAdded ?? new Date();
    contact.firstName = form.firstName!;
    contact.prefix = form.prefix!?? '';
    contact.lastName = form.lastName!;
    contact.email = form.email ?? '';
    contact.phoneNumber = form.phoneNumber ?? '';
    contact.additionalInfo = form.additionalInfo ?? '';
    contact.clubId = crypto.randomUUID();
    if (this.selectedContact === null) {
      this.contactService.create(contact).subscribe(this.subscriptionHandler);
    } else {
      this.contactService.update(contact).subscribe(this.subscriptionHandler);
    }
  }

  private subscriptionHandler: any = {
    next: (a: ContactModel) => {
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
    return this.contactForm.get('firstName')!;
  }
  get lastName() {
    return this.contactForm.get('lastName')!;
  }
}

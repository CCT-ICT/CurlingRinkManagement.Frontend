import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact-model';
import { ContactEditorComponent } from "../contact-editor/contact-editor.component";
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-overview',
  imports: [ContactEditorComponent],
  templateUrl: './contact-overview.component.html',
  styleUrl: './contact-overview.component.scss'
})
export class ContactOverviewComponent implements OnInit {
  public contacts: ContactModel[] = [];

  public expended: string | null = null;
  public showContactModal: boolean = false;
  public contactToEdit: ContactModel | null = null;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getAll().subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  public expend(id: string) {
    if (id === this.expended)
      this.expended = null;
    else
      this.expended = id;
  }

  public contactEdited(contact: ContactModel) {
    if (this.contactToEdit == null) {
      this.contacts.push(contact);
    }
    else{
      let index = this.contacts.indexOf(this.contactToEdit);
      this.contacts[index] = contact;  
      this.contactToEdit = null;    
    }
    this.showContactModal = false;
  }
}

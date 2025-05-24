import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact-model';
import { ContactEditorComponent } from "../contact-editor/contact-editor.component";
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';
import { BasePaginationPageComponent } from '../../../../../common-api/src/public-api';
import { PaginationControlsComponent } from "../../../../../common-api/src/lib/components/pagination-controls/pagination-controls.component";

@Component({
  selector: 'app-contact-overview',
  imports: [ContactEditorComponent, FormsModule, PaginationControlsComponent],
  templateUrl: './contact-overview.component.html',
  styleUrl: './contact-overview.component.scss'
})
export class ContactOverviewComponent extends BasePaginationPageComponent implements OnInit {
  public contacts: ContactModel[] = [];

  public expended: string | null = null;
  public showContactModal: boolean = false;
  public contactToEdit: ContactModel | null = null;
  public searchText: string = '';


  constructor(private contactService: ContactService) { super() }

  ngOnInit(): void {
    this.loadEntities();
    this.loadAmount();
  }
  
  override loadEntities(): void {
    let filters: string[] | null = null;
    let filterValues: string[] | null = null;
    if (this.searchText.length > 0) {
      filters = ["Generic"];
      filterValues = [this.searchText];
    }
    this.contactService.getAll(this.currentPage, this.pageSize, filters, filterValues).subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  private loadAmount() {
    let filters: string[] | null = null;
    let filterValues: string[] | null = null;
    if (this.searchText.length > 0) {
      filters = ["Generic"];
      filterValues = [this.searchText];
    }
    this.contactService.getAmount(filters, filterValues).subscribe(c => {
      this.totalAmount = c
    });
  }

  public search() {
    this.loadEntities();
    this.loadAmount();
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
    else {
      let index = this.contacts.indexOf(this.contactToEdit);
      this.contacts[index] = contact;
    }
    this.contactToEdit = null;
    this.showContactModal = false;
  }

  public editContact(contact: ContactModel) {
    this.showContactModal = true;
    this.contactToEdit = contact;
  }

  public currentPageChange(newPage:number) {
    this.loadEntities();
    this.currentPage = newPage;
  }

}

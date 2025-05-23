import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact-model';
import { ContactEditorComponent } from "../contact-editor/contact-editor.component";
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-overview',
  imports: [ContactEditorComponent, FormsModule],
  templateUrl: './contact-overview.component.html',
  styleUrl: './contact-overview.component.scss'
})
export class ContactOverviewComponent implements OnInit {
  public contacts: ContactModel[] = [];

  public expended: string | null = null;
  public showContactModal: boolean = false;
  public contactToEdit: ContactModel | null = null;


  // Pagination properties
  public currentPage: number = 1;
  public pageSize: number = 3 * 6;
  public totalAmount: number = 0;
  public searchText: string = '';

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
    this.loadAmount();
  }

  private loadContacts() {
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
    this.loadContacts();
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


  // Pagination methods
  getTotalPages(): number {
    return Math.ceil(this.totalAmount / this.pageSize);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.totalAmount);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.loadContacts();
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to first page when changing page size
  }

  getVisiblePages(): number[] {
    const totalPages = this.getTotalPages();
    const current = this.currentPage;
    const pages: number[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, current - 2);
      const end = Math.min(totalPages, current + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }
}

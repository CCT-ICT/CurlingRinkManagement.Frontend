import { AfterViewInit, Component, ElementRef, EventEmitter, Input, input, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, filter, fromEvent, map } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { ContactModel } from '../../models/contact-model';
import { FormsModule } from '@angular/forms';
import { ContactEditorComponent } from "../contact-editor/contact-editor.component";

@Component({
  selector: 'app-contact-selector',
  imports: [FormsModule, ContactEditorComponent],
  templateUrl: './contact-selector.component.html',
  styleUrl: './contact-selector.component.scss'
})
export class ContactSelectorComponent implements AfterViewInit {
  @ViewChild('contactSearchBox') searchBox: ElementRef | null = null;

  public contacts: ContactModel[] = [];

  @Input()
  public selectedContact: ContactModel | null = null;
  @Output()
  public selectedContactChange: EventEmitter<ContactModel | null> = new EventEmitter();

  public searchtext: string = "";

  public showContactCreation: boolean = false;

  constructor(private contactService: ContactService) { }

  ngAfterViewInit(): void {
    if (this.searchBox === null) return;
    const keyup$ = fromEvent(this.searchBox.nativeElement, 'keyup')

    keyup$.pipe(
      map((i: any) => i.currentTarget.value),
      debounceTime(200)
    )
      .subscribe((value: any) => {
        this.searchContacts(value);
      });
  }


  private searchContacts(searchText: string) {
    console.log("start searching")
    if (searchText === null || searchText === "" || searchText.replaceAll(" ", "") === "") {
      this.contacts = [];
      return;
    }
    this.contactService.getAll(null, 5, ["Generic"], [searchText]).subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  public selectContact(contact: ContactModel) {
    this.selectedContact = contact;
    this.selectedContactChange.emit(this.selectedContact);
    this.searchtext = contact.firstName + " " + contact.prefix + " " + contact.lastName
  }

  public clearSelection() {
    this.selectedContact = null;
    this.selectedContactChange.emit(this.selectedContact);
    this.searchtext = "";
  }

  public contactCreated(contactModel: ContactModel) {
    this.selectedContact = contactModel;
    this.showContactCreation = false;
  }

  public addNewContact() {
    this.showContactCreation = true;
  }

  hideContactCreation() {
    this.showContactCreation = false
  }
}

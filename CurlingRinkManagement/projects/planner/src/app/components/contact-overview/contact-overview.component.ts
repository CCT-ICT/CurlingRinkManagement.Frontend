import { Component } from '@angular/core';
import { ContactModel } from '../../models/contact-model';

@Component({
  selector: 'app-contact-overview',
  imports: [],
  templateUrl: './contact-overview.component.html',
  styleUrl: './contact-overview.component.scss'
})
export class ContactOverviewComponent {
  public contacts: ContactModel[] = [{
    id: '',
    clubId: '',
    firstName: 'Bart',
    prefix: '',
    lastName: 'Klomp',
    email: 'bartpklomp@gmail.com',
    phoneNumber: '06-40122165',
    additionalInfo: 'Test',
    dateAdded: new Date(),
    tags: [{ id: '', clubId: '', title: 'Cool guy', parentId: null }]
  }];
}

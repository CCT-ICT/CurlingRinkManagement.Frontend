import { Tag } from "./tag";

export class ContactModel {

    id: string = '';
    clubId: string = '';
    firstName: string = '';
    prefix: string = '';
    lastName: string = '';
    email: string = '';
    phoneNumber: string = '';
    additionalInfo: string = '';
    dateAdded: Date = new Date();
    tags: Tag[] = [];

}
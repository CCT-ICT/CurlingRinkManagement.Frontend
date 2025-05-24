export class CustomerRequest {

    id: string = '';
    clubId: string = '';
    title: string = '';
    amountOfPeople: number = 0;
    additionalInfo: string = '';
    customPriceReason: string | null = null;
    customPrice: number | null = null;
    customerRequestState: CustomerRequestState = CustomerRequestState.ConversationStarted;
    contactId:string | null = null;
}

export enum CustomerRequestState {
    ConversationStarted,
    DateInOption,
    DateConfirmed,
    InvoiceSent,
    PaymentReceived,
    Completed,
    Cancled
}
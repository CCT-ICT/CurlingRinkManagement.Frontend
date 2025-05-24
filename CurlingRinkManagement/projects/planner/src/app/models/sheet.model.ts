export class SheetModel {
    public id : string = crypto.randomUUID();
    public clubId: string = crypto.randomUUID();
    public name : string = "";
    public order : number = -1;
}
export class LinkedInstructor {
    public id: string = crypto.randomUUID();
    public clubId: string = crypto.randomUUID();
    public userIdentity: string = "";

    constructor(userIdentity: string) {
        this.userIdentity = userIdentity;
    }
}
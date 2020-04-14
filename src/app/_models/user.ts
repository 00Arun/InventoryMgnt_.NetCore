
export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public userName: string;  
    public mobileNumber: string;
    public token?: string;
    public tokenExpirationDate: Date;
    public lastLogin?: Date;
    public usertype: string;
    public Suburb: string;
    public City: string;
    public State: number;
    public PostCode: number;
    public roles: Roles;
    public isAuthenticated: Boolean;
    public roleName:string;
    public country:string;
}
export class Roles {
    public Id: string;
    public RomeName: string;
    public Description: string;
}

export class User{
    name: string;
    clientType : string;
    
    constructor(name: string, clientType: string){
        this.name = name;
        this.clientType = clientType;
    }
}
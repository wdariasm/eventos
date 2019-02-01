
export class Evento {
    id : number;
    name : string;
    place : string;
    address : string; 
    start_date : Date;
    end_date: Date;
    modality : string;
    category : string;
    userId : number;

    constructor(){
        this.address = "";
        this.name = "";
        this.place = "";
        this.start_date = new Date();
        this.end_date = new Date();
        this.modality = "Presencial";
        this.id = 0;
        this.category = "Conferencia";
        this.userId = 1;
    }
}


export class Usuario {
    username : string; 
    password : string ; 
    email : string; 

    constructor(){
        this.email = "";
        this.password = "";
        this.username = "";
    }
}

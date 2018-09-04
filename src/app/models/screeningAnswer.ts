export class ScreeningAnswer{
    propertyID : number;
    userID : number;
    
    question : string;
    optionSelected : string;
    optionValue : number;
    optionColor : string;

    constructor(propertyID: number, userID : number,
                question: string, optionSelected : string, optionVal : number,
                optionColor : string){
        this.propertyID = propertyID;
        this.userID = userID;
        
        this.question = question;
        this.optionSelected = optionSelected;
        this.optionValue = optionVal;
        this.optionColor = optionColor;         
    }
}
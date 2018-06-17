export class FreeQuote{
    full_name: string;   
    company: string;
    email: string;
    phone_number: string;
    volume: number;
    frequency : string;
    other_needs : string; 

     
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
}
export class User {
    id: number;
    email: string;    
    password: string;
    confirmpassword: string;
    phone: string;
    first_Name: string;
    last_Name: string;    
 
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
}

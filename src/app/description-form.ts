export class Description{
    title: string;   
    description: string;  
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
}
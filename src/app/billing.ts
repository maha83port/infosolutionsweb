export class Billing {
    shipping_address_id: number;   
    phone: string;
    first_Name: string;
    last_Name: string;
    street_address: string;
    city: string;
    country: string;
    zip:string;
    state: string;
    payment_method: boolean;    
    sub_total: number;
    tax_amt: number;
    purchase_order_id: number;
    status: number;
    session_id: string;
    coupon_code: string;

 
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
}

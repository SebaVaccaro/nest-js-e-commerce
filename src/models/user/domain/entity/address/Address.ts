export class Address {
    street: string;
    city: string;
    state: string;
    country: string;
    _id: string;

    constructor( street: string, city: string, state: string, country: string, _id:string) {
      this._id = _id;  
      this.street = street;
      this.city = city;
      this.state = state;
      this.country = country;
    }
  }
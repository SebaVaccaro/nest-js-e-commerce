export class Address {
    id: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  
    constructor(id: string, street: string, city: string, state: string, country: string, zip: string) {
      this.id = id;
      this.street = street;
      this.city = city;
      this.state = state;
      this.country = country;
      this.zip = zip;
    }
  }
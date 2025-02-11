type Product = {
  id:string,
  price:number,
  quantity:number
}
export class ShoppingOrder {
    id: string;
    userId: string;
    date: Date;
    products: Product[];
    price: number;
    payment: string;
    state: "pending" | "shipped" | "delivered";
  
    constructor(id: string, userId: string, payment: string, state: "pending" | "shipped" | "delivered") {
      this.id = id;
      this.userId = userId;
      this.date = new Date();
      this.products = [];
      this.price = 0;
      this.payment = payment;
      this.state = state;
    }
  
    addProduct(product: Product) {
      this.products.push(product);
      this.price += product.price * product.quantity;
    }
  }
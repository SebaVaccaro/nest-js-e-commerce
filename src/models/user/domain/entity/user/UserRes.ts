import { Address } from "../address/Address";
import { Favorite } from "../favorite/Favorite";
import { ShoppingOrder } from "../shoppingOrder/ShoppingOrder";

export class UserRes {
  _id: string;
  email: string;
  addressData: Address[];
  favoritesData: Favorite[];
  shoppingData: ShoppingOrder[];
  status: "active" | "inactive" | "banned";
  createdAt: Date;
  updatedAt: Date;

  constructor(
    _id: string,
    email: string,
    status: "active" | "inactive" | "banned" = "active",
    addressData: Address[] = [],
    favoritesData: Favorite[] = [],
    shoppingData: ShoppingOrder[] = [],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = _id;
    this.email = email;
    this.addressData = addressData;
    this.favoritesData = favoritesData;
    this.shoppingData = shoppingData;
    this.status = status;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}

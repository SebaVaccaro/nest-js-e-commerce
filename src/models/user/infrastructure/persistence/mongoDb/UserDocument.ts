
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Address } from "src/models/user/domain/entity/address/Address";
import { Favorite } from "src/models/user/domain/entity/favorite/Favorite";
import { ShoppingOrder } from "src/models/user/domain/entity/shoppingOrder/ShoppingOrder";
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = UserS & Document;

@Schema({ timestamps: true })
export class UserS {
  @Prop({ type: String, required: true, default: uuidv4 })
  _id: string;
  
  @Prop({ type: Object, required: true })
  email: string;
  
  @Prop({ type: String, required: true })
  username: string;
  
  @Prop({ type: String, enum: ["active", "inactive", "banned"], default: "active" })
  status: "active" | "inactive" | "banned";
  
  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
  
  @Prop({ type: Array, default: [] })
  addressData: Address[];

  @Prop({ type: Array, default: [] })
  favoritesData: Favorite[];

  @Prop({ type: Array, default: [] })
  shoppingData: ShoppingOrder[];


}

export const UserSchema = SchemaFactory.createForClass(UserS)

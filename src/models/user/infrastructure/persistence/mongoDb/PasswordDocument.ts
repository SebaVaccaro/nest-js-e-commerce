import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export type PasswordDocument = PasswordS & Document;

@Schema({ timestamps: true })
export class PasswordS {
  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, default: uuidv4 })
  _id: string;
}

export const PasswordSchema = SchemaFactory.createForClass(PasswordS)
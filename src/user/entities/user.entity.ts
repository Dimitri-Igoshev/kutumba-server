import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address } from "src/common/interface/address.interface";

export enum UserRole {
  USER = "USER",
  COMPANY = "COMPANY",
  ADMIN = "ADMIN"
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED"
}

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })
  phone: string;

  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  patronymic: string;

  @Prop({ type: String })
  photoUrl: string;

  @Prop({ type: String })
  email: string;
  
  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole

  @Prop({ type: String, enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus

  @Prop({ type: Object })
  address: Address

  @Prop({ type: String })
  authCode: string;

  @Prop({ type: String })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
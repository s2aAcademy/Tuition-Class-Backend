import { IsEmail, Length, isEmail } from "class-validator";
import { Role } from "../utility/constants";

export class CreateCustomerInput {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(3, 20)
  firstName: string;

  @Length(3, 20)
  lastName: string;

  @Length(6, 12)
  password: string;

  classId: string;

  slip: string;

  role: string;

  userName: string;
}

export class UserLoginInput {
  @IsEmail()
  email: string;

  @Length(6, 12)
  password: string;
}

export class EditCustomerProfileInput {
  @Length(3, 16)
  firstName: string;

  @Length(3, 16)
  lastName: string;

  @Length(6, 16)
  address: string;
}

export interface CustomerPayload {
  _id: string;
  phone: string;
  role: Role;
}

export class CartItem {
  _id: string;
  unit: number;
}

export class OrderInputs {
  txnId: string;
  amount: string;
  items: [CartItem];
}

export class CreateDeliveryUserInput {
  @IsEmail()
  email: string;

  @Length(7, 12)
  phone: string;

  @Length(6, 12)
  password: string;

  @Length(3, 12)
  firstName: string;

  @Length(3, 12)
  lastName: string;

  @Length(6, 24)
  address: string;

  @Length(4, 12)
  pincode: string;
}

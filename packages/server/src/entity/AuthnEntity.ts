import { IsString } from "class-validator";

export default class AuthnEntity {
  @IsString()
  login: string;

  @IsString()
  password: string;

  constructor(partial: Partial<AuthnEntity>) {
    Object.assign(this, partial);
  }
}

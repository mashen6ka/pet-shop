import dotenv from "dotenv";
import path from "path";
import axios from "axios";
import { AuthnEntity, UserEntity } from "../src/entity";

dotenv.config({
  path: path.join(__dirname, "..", ".env." + process.env.ENV),
});

export async function createAndAuthenticateUser(user: UserEntity) {
  await createUser(user);
  return await authenticateUser(user.login, user.password);
}

export async function createUser(user: UserEntity) {
  const response = await axios.post(
    process.env.SERVER_URL + "/user/create",
    user
  );
  return response.data.data.id;
}

export async function authenticateUser(login: string, password: string) {
  const authn = new AuthnEntity({ login, password });
  const response = await axios.post(
    process.env.SERVER_URL + "/user/authn",
    authn
  );
  return response.data.data.token;
}

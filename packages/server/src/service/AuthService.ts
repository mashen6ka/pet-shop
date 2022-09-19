import crypto from "crypto";
import { AuthnEntity } from "../entity";
import { IUserRepo } from "../repository";

export default class AuthService {
  private repo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.repo = repo;
  }

  private hash(str: string): string {
    return crypto.createHash("sha256").update(str).digest("base64");
  }

  async authenticateUser(authn: AuthnEntity): Promise<string> {
    const password = this.hash(authn.password);
    const userId = await this.repo.getUserIdByLoginAndPassword(
      authn.login,
      password
    );
    if (userId === null) return null;
    return await this.repo.createSession(userId);
  }

  async getUserIdByToken(token: string): Promise<number> {
    return await this.repo.getUserIdByToken(token);
  }

  async getWorkerIdByToken(token: string): Promise<number> {
    return await this.repo.getWorkerIdByToken(token);
  }
}

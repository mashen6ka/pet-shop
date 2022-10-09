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
    if (!userId) return null;
    const token = await this.repo.createSession(userId);
    return token;
  }

  async getUserIdByToken(token: string): Promise<number> {
    const userId = await this.repo.getUserIdByToken(token);
    return userId;
  }

  async getWorkerIdByToken(token: string): Promise<number> {
    const userId = await this.repo.getWorkerIdByToken(token);
    return userId;
  }
}

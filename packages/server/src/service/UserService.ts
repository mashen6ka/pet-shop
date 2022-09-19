import crypto from "crypto";
import { CompanyEntity, UserEntity, OrderEntity, AuthnEntity } from "../entity";
import { IUserRepo } from "../repository";

export default class UserService {
  private repo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.repo = repo;
  }

  private hash(str: string): string {
    return crypto.createHash("sha256").update(str).digest("base64");
  }

  async createUser(user: UserEntity): Promise<number> {
    user.password = this.hash(user.password);
    const id = await this.repo.createUser(user);
    return id;
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
    const id = await this.repo.getUserIdByToken(token);
    return id;
  }

  async updateUser(user: UserEntity): Promise<void> {
    user.password = this.hash(user.password);
    await this.repo.updateUser(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repo.deleteUser(id);
  }

  async getUser(id: number): Promise<UserEntity> {
    const user = await this.repo.getUser(id);
    return user;
  }

  async getUserList(): Promise<Array<UserEntity>> {
    const userList = await this.repo.getUserList();
    return userList;
  }

  async getUserCompanyList(userId: number): Promise<Array<CompanyEntity>> {
    const companyList = await this.repo.getUserCompanyList(userId);
    return companyList;
  }

  async getUserOrderList(userId: number): Promise<Array<OrderEntity>> {
    const orderList = await this.repo.getUserOrderList(userId);
    return orderList;
  }

  async createUserCompany(userId: number, companyId: number): Promise<void> {
    await this.repo.createUserCompany(userId, companyId);
  }

  async deleteUserCompany(userId: number, companyId: number): Promise<void> {
    await this.repo.deleteUserCompany(userId, companyId);
  }
}

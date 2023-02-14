import { IUserRepo } from "../repository";

export default class AuthService {
  private repo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.repo = repo;
  }

  async getWorkerByUserId(userId: number): Promise<boolean> {
    const worker = await this.repo.getWorkerByUserId(userId);
    return worker;
  }
}

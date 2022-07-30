import { WorkerEntity } from "../entity";
import { IWorkerRepo } from "../repository";

export default class WorkerService {
  private repo: IWorkerRepo;

  constructor(repo: IWorkerRepo) {
    this.repo = repo;
  }

  async createWorker(worker: WorkerEntity): Promise<Number> {
    //хеширование пароля
    const id = await this.repo.createWorker(worker);
    return id;
  }

  async updateWorker(worker: WorkerEntity): Promise<void> {
    //хеширование пароля
    await this.repo.updateWorker(worker);
  }

  async deleteWorker(id: number): Promise<void> {
    await this.repo.deleteWorker(id);
  }

  async getWorker(id: number): Promise<WorkerEntity> {
    const worker = await this.repo.getWorker(id);
    return worker;
  }
}

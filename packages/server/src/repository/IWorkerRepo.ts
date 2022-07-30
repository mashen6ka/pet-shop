import { WorkerEntity } from "../entity";

export default interface IWorkerRepo {
  createWorker: (worker: WorkerEntity) => Promise<Number>;
  updateWorker: (worker: WorkerEntity) => Promise<void>;
  deleteWorker: (id: number) => Promise<void>;
  getWorker: (id: number) => Promise<WorkerEntity>;
}

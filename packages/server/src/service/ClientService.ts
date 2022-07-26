import { ClientEntity } from "../entity";
import { IClientRepo } from "../repository";

export default class ClientService {
  private repo: IClientRepo;

  constructor(repo: IClientRepo) {
    this.repo = repo;
  }

  async createClient(client: ClientEntity): Promise<Number> {
    //хеширование пароля
    const id = await this.repo.createClient(client);
    return id;
  }

  async updateClient(client: ClientEntity): Promise<void> {
    //хеширование пароля
    await this.repo.updateClient(client);
  }

  async deleteClient(id: number): Promise<void> {
    await this.repo.deleteClient(id);
  }

  async getClient(id: number): Promise<ClientEntity> {
    const client = await this.repo.getClient(id);
    return client;
  }
}

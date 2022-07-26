import { ClientEntity } from "../entity";

export default interface IClientRepo {
  createClient: (client: ClientEntity) => Promise<void>;
  updateClient: (client: ClientEntity) => Promise<void>;
  deleteClient: (id: number) => Promise<void>;
  getClient: (id: number) => Promise<ClientEntity>;
}

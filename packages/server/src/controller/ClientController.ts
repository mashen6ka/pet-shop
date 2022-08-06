import { Request, Response } from "express";
import { ClientService } from "../service";
import { ClientEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class ClientController {
  private service: ClientService;

  constructor(service: ClientService) {
    this.service = service;
  }

  async createClient(req: Request, res: Response): Promise<Number> {
    try {
      const client = plainToInstance(ClientEntity, req.body);
      await validateOrReject(client);
      const id = await this.service.createClient(client);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateClient(req: Request, res: Response): Promise<void> {
    try {
      const client = plainToInstance(ClientEntity, req.body);
      await validateOrReject(client);
      await this.service.updateClient(client);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteClient(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteClient(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getClient(req: Request, res: Response): Promise<ClientEntity> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      const client = await this.service.getClient(id);
      if (_.isEmpty(client)) {
        throw "Client not found";
      }
      res.status(200).json({ success: true, data: client });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}

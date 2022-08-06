import { Request, Response } from "express";
import { WorkerService } from "../service";
import { WorkerEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class WorkerController {
  private service: WorkerService;

  constructor(service: WorkerService) {
    this.service = service;
  }

  async createWorker(req: Request, res: Response): Promise<Number> {
    try {
      const worker = plainToInstance(WorkerEntity, req.body);
      await validateOrReject(worker);
      const id = await this.service.createWorker(worker);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateWorker(req: Request, res: Response): Promise<void> {
    try {
      const worker = plainToInstance(WorkerEntity, req.body);
      await validateOrReject(worker);
      await this.service.updateWorker(worker);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteWorker(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteWorker(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getWorker(req: Request, res: Response): Promise<WorkerEntity> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      const worker = await this.service.getWorker(id);
      if (_.isEmpty(worker)) {
        throw "Worker not found";
      }
      res.status(200).json({ success: true, data: worker });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}

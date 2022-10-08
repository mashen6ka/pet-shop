import { Request, Response } from "express";
import BaseController from "./BaseController";
import { ManufacturerService, AuthService } from "../service";
import { ManufacturerEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class ManufacturerController extends BaseController {
  private service: ManufacturerService;

  constructor(
    authService: AuthService,
    manufacturerService: ManufacturerService
  ) {
    super(authService);
    this.service = manufacturerService;
  }

  async createManufacturer(req: Request, res: Response): Promise<number> {
    try {
      await this.checkWorkerToken(req);
      const manufacturer = plainToInstance(ManufacturerEntity, req.body);
      await validateOrReject(manufacturer);
      const id = await this.service.createManufacturer(manufacturer);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateManufacturer(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const manufacturer = plainToInstance(ManufacturerEntity, req.body);
      await validateOrReject(manufacturer);
      await this.service.updateManufacturer(manufacturer);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteManufacturer(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteManufacturer(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getManufacturer(
    req: Request,
    res: Response
  ): Promise<ManufacturerEntity> {
    try {
      const id = Number(req.query.id);
      if (!id) {
        throw "Invalid data: no manufacturer id";
      }
      const manufacturer = await this.service.getManufacturer(id);
      if (_.isEmpty(manufacturer)) {
        throw "Manufacturer not found";
      }
      res.status(200).json({ success: true, data: manufacturer });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getManufacturerList(
    req: Request,
    res: Response
  ): Promise<Array<ManufacturerEntity>> {
    try {
      const manufacturerList = await this.service.getManufacturerList();
      if (_.isEmpty(manufacturerList)) {
        throw "No manufacturers available";
      }
      res.status(200).json({ success: true, data: manufacturerList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}

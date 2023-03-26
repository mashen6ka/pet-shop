import { Request, Response } from "express";
import BaseController from "./BaseController";
import { ManufacturerService, AuthService } from "../service";
import { ManufacturerEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import { ErrorEntity } from "../entity/ErrorEntity";
import { statusCode } from "../common";

export default class ManufacturerController extends BaseController {
  private service: ManufacturerService;

  constructor(
    authService: AuthService,
    manufacturerService: ManufacturerService
  ) {
    super(authService);
    this.service = manufacturerService;
  }

  async createManufacturer(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const manufacturer = plainToInstance(ManufacturerEntity, req.body);
      await validateOrReject(manufacturer);
      const id = await this.service.createManufacturer(manufacturer);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async updateManufacturer(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const manufacturer = plainToInstance(ManufacturerEntity, req.body);
      await validateOrReject(manufacturer);
      await this.service.updateManufacturer(manufacturer);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteManufacturer(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = Number(req.params.id);
      if (!Number.isInteger(id)) {
        throw new ErrorEntity(
          "Manufacturer id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.deleteManufacturer(id);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getManufacturer(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (!id) {
        throw new ErrorEntity(
          "Manufacturer id must be a positive integer",
          statusCode.badRequest
        );
      }
      const manufacturer = await this.service.getManufacturer(id);
      if (manufacturer === null) {
        throw new ErrorEntity("Manufacturer not found", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: manufacturer });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getManufacturerList(req: Request, res: Response): Promise<void> {
    try {
      const manufacturerList = await this.service.getManufacturerList();
      if (_.isEmpty(manufacturerList)) {
        throw new ErrorEntity(
          "No manufacturers available",
          statusCode.notFound
        );
      }
      res.status(200).json({ success: true, data: manufacturerList });
      return;
    } catch (err) {
      this.handleError(err, req, res);
      return;
    }
  }
}

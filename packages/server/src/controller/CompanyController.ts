import { Request, Response } from "express";
import { CompanyService } from "../service";
import { CompanyEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class CompanyController {
  private service: CompanyService;

  constructor(service: CompanyService) {
    this.service = service;
  }

  async createCompany(req: Request, res: Response): Promise<Number> {
    try {
      const company = plainToInstance(CompanyEntity, req.body);
      await validateOrReject(company);
      const id = await this.service.createCompany(company);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateCompany(req: Request, res: Response): Promise<void> {
    try {
      const company = plainToInstance(CompanyEntity, req.body);
      await validateOrReject(company);
      await this.service.updateCompany(company);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteCompany(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteCompany(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getCompany(req: Request, res: Response): Promise<CompanyEntity> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      const company = await this.service.getCompany(id);
      if (_.isEmpty(company)) {
        throw "Company not found";
      }
      res.status(200).json({ success: true, data: company });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}

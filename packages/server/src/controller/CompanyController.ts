import { Request, Response } from "express";
import { CompanyService, AuthService } from "../service";
import { CompanyEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import BaseController from "./BaseController";
import _ from "lodash";

export default class CompanyController extends BaseController {
  private service: CompanyService;

  constructor(authService: AuthService, companyService: CompanyService) {
    super(authService);
    this.service = companyService;
  }

  async createCompany(req: Request, res: Response): Promise<number> {
    try {
      await this.checkWorkerToken(req);
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
      await this.checkWorkerToken(req);
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
      await this.checkWorkerToken(req);
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
      await this.checkWorkerToken(req);
      const id = Number(req.query.id);
      if (!id) {
        throw "Invalid data: no company id";
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

  async getCompanyList(req: Request, res: Response): Promise<CompanyEntity> {
    try {
      await this.checkWorkerToken(req);
      const companyList = await this.service.getCompanyList();
      if (_.isEmpty(companyList)) {
        throw "No companies available";
      }
      res.status(200).json({ success: true, data: companyList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}

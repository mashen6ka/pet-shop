import { Request, Response } from "express";
import { CompanyService, AuthService } from "../service";
import { CompanyEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import BaseController from "./BaseController";
import _ from "lodash";
import { ErrorEntity } from "../entity/ErrorEntity";
import { statusCode } from "../common";

export default class CompanyController extends BaseController {
  private service: CompanyService;

  constructor(authService: AuthService, companyService: CompanyService) {
    super(authService);
    this.service = companyService;
  }

  async createCompany(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const company = plainToInstance(CompanyEntity, req.body);
      await validateOrReject(company);
      const id = await this.service.createCompany(company);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async updateCompany(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const company = plainToInstance(CompanyEntity, req.body);
      await validateOrReject(company);
      await this.service.updateCompany(company);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteCompany(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw new ErrorEntity(
          "Company id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.deleteCompany(id);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getCompany(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const id = Number(req.query.id);
      if (!id) {
        throw new ErrorEntity(
          "Company id must be a positive integer",
          statusCode.badRequest
        );
      }
      const company = await this.service.getCompany(id);
      if (company === null) {
        throw new ErrorEntity("Company not found", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: company });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getCompanyList(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const companyList = await this.service.getCompanyList();
      if (_.isEmpty(companyList)) {
        throw new ErrorEntity("No companies available", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: companyList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }
}

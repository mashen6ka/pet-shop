import { Request, Response } from "express";
import BaseController from "./BaseController";
import { CountryService, AuthService } from "../service";
import { CountryEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import { ErrorEntity } from "../entity/ErrorEntity";
import { statusCode } from "../common";

export default class CountryController extends BaseController {
  private service: CountryService;

  constructor(authService: AuthService, countryService: CountryService) {
    super(authService);
    this.service = countryService;
  }

  async createCountry(req: Request, res: Response): Promise<void> {
    try {
      const country = plainToInstance(CountryEntity, req.body);
      await validateOrReject(country);
      const id = await this.service.createCountry(country);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async updateCountry(req: Request, res: Response): Promise<void> {
    try {
      const country = plainToInstance(CountryEntity, req.body);
      await validateOrReject(country);
      await this.service.updateCountry(country);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteCountry(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw new ErrorEntity(
          "Country id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.deleteCountry(id);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getCountry(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      if (!id) {
        throw new ErrorEntity(
          "Country id must be a positive integer",
          statusCode.badRequest
        );
      }
      const country = await this.service.getCountry(id);
      if (country === null) {
        throw new ErrorEntity("Country not found", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: country });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getCountryList(req: Request, res: Response): Promise<void> {
    try {
      const countryList = await this.service.getCountryList();
      if (_.isEmpty(countryList)) {
        throw new ErrorEntity("No countries available", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: countryList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }
}

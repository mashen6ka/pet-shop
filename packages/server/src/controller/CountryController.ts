import { Request, Response } from "express";
import BaseController from "./BaseController";
import { CountryService, AuthService } from "../service";
import { CountryEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

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
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async updateCountry(req: Request, res: Response): Promise<void> {
    try {
      const country = plainToInstance(CountryEntity, req.body);
      await validateOrReject(country);
      await this.service.updateCountry(country);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async deleteCountry(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteCountry(id);
      res.status(200).json({ success: true });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async getCountry(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.query.id);
      if (!id) {
        throw "Invalid data: no country id";
      }
      const country = await this.service.getCountry(id);
      if (_.isEmpty(country)) {
        throw "Country not found";
      }
      res.status(200).json({ success: true, data: country });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }

  async getCountryList(req: Request, res: Response): Promise<void> {
    try {
      const countryList = await this.service.getCountryList();
      if (_.isEmpty(countryList)) {
        throw "No countrys available";
      }
      res.status(200).json({ success: true, data: countryList });
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
    }
  }
}

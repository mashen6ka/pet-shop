import { Request, Response } from "express";
import { CountryService } from "../service";
import { CountryEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class CountryController {
  private service: CountryService;

  constructor(service: CountryService) {
    this.service = service;
  }

  async createCountry(req: Request, res: Response): Promise<Number> {
    try {
      const country = plainToInstance(CountryEntity, req.body);
      await validateOrReject(country);
      const id = await this.service.createCountry(country);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateCountry(req: Request, res: Response): Promise<void> {
    try {
      const country = plainToInstance(CountryEntity, req.body);
      await validateOrReject(country);
      await this.service.updateCountry(country);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
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
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getCountry(req: Request, res: Response): Promise<CountryEntity> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      const country = await this.service.getCountry(id);
      if (_.isEmpty(country)) {
        throw "Country not found";
      }
      res.status(200).json({ success: true, data: country });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getCountryList(
    req: Request,
    res: Response
  ): Promise<Array<CountryEntity>> {
    try {
      const countryList = await this.service.getCountryList();
      if (_.isEmpty(countryList)) {
        throw "No countrys available";
      }
      res.status(200).json({ success: true, data: countryList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}

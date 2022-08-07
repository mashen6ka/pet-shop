import { Request, Response } from "express";
import { UserService } from "../service";
import { UserEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";

export default class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  async createUser(req: Request, res: Response): Promise<Number> {
    try {
      const user = plainToInstance(UserEntity, req.body);
      await validateOrReject(user);
      const id = await this.service.createUser(user);
      res.status(200).json({ success: true, data: { id } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const user = plainToInstance(UserEntity, req.body);
      await validateOrReject(user);
      await this.service.updateUser(user);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      await this.service.deleteUser(id);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getUser(req: Request, res: Response): Promise<UserEntity> {
    try {
      const id = req.body.id;
      if (!Number.isInteger(id)) {
        throw "Invalid data: id must be an int value";
      }
      const user = await this.service.getUser(id);
      if (_.isEmpty(user)) {
        throw "User not found";
      }
      res.status(200).json({ success: true, data: user });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}

import { Request, Response } from "express";
import BaseController from "./BaseController";
import { AuthService, UserService } from "../service";
import { CompanyEntity, UserEntity, OrderEntity, AuthnEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import { cookieName } from "../config";

export default class UserController extends BaseController {
  private service: UserService;

  constructor(authService: AuthService, userService: UserService) {
    super(authService);
    this.service = userService;
  }

  async authenticateUser(req: Request, res: Response): Promise<Number> {
    try {
      const authn = plainToInstance(AuthnEntity, req.body);
      await validateOrReject(authn);
      const token = await this.service.authenticateUser(authn);
      if (token === null) {
        throw "User not found";
      }
      // res.cookie(cookieName, token, { httpOnly: true });
      res.status(200).json({ success: true, data: { token } });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async createUser(req: Request, res: Response): Promise<Number> {
    try {
      // await this.checkWorkerToken(req);
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
      const id = await this.getUserIdByToken(req);
      const user = plainToInstance(UserEntity, req.body);
      user.id = id;
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
      const id = await this.getUserIdByToken(req);
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
      const id = await this.getUserIdByToken(req);
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

  async getUserList(req: Request, res: Response): Promise<UserEntity> {
    try {
      await this.checkWorkerToken(req);
      const userList = await this.service.getUserList();
      if (_.isEmpty(userList)) {
        throw "No users available";
      }
      res.status(200).json({ success: true, data: userList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getUserCompanyList(
    req: Request,
    res: Response
  ): Promise<Array<CompanyEntity>> {
    try {
      const userId = await this.getUserIdByToken(req);
      const companyList = await this.service.getUserCompanyList(userId);
      res.status(200).json({ success: true, data: companyList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async getUserOrderList(
    req: Request,
    res: Response
  ): Promise<Array<OrderEntity>> {
    try {
      const userId = await this.getUserIdByToken(req);
      const orderList = await this.service.getUserOrderList(userId);
      res.status(200).json({ success: true, data: orderList });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async createUserCompany(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.getUserIdByToken(req);
      const companyId = req.body.companyId;
      if (!Number.isInteger(companyId)) {
        throw "Invalid data: companyId must be int value";
      }
      await this.service.createUserCompany(userId, companyId);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }

  async deleteUserCompany(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.getUserIdByToken(req);
      const companyId = req.body.companyId;
      if (!Number.isInteger(companyId)) {
        throw "Invalid data: companyId must be int value";
      }
      await this.service.deleteUserCompany(userId, companyId);
      res.status(200).json({ success: true });
      return;
    } catch (err) {
      res.status(502).json({ success: false, error: new Error(err).message });
      return;
    }
  }
}

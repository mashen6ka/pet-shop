import { Request, Response } from "express";
import BaseController from "./BaseController";
import { AuthService, UserService } from "../service";
import { UserEntity, AuthnEntity } from "../entity";
import { validateOrReject } from "class-validator";
import { plainToInstance } from "class-transformer";
import _ from "lodash";
import { ErrorEntity } from "../entity/ErrorEntity";
import { statusCode } from "../common";

export default class UserController extends BaseController {
  private service: UserService;

  constructor(authService: AuthService, userService: UserService) {
    super(authService);
    this.service = userService;
  }

  async authenticateUser(req: Request, res: Response): Promise<void> {
    try {
      const authn = plainToInstance(AuthnEntity, req.body);
      await validateOrReject(authn);
      const token = await this.service.authenticateUser(authn);
      if (!token) {
        throw new ErrorEntity("User not found", statusCode.notFound);
      }
      // res.cookie(cookieName, token, { httpOnly: true });
      res.status(200).json({ success: true, data: { token } });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      // await this.checkWorkerToken(req);
      const user = plainToInstance(UserEntity, req.body);
      await validateOrReject(user);
      const id = await this.service.createUser(user);
      res.status(200).json({ success: true, data: { id } });
    } catch (err) {
      this.handleError(err, req, res);
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
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body.id;
      await this.service.deleteUser(id);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const id = await this.getUserIdByToken(req);
      const user = await this.service.getUser(id);
      if (user === null) {
        throw new ErrorEntity("User not found", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getUserList(req: Request, res: Response): Promise<void> {
    try {
      await this.checkWorkerToken(req);
      const userList = await this.service.getUserList();
      if (_.isEmpty(userList)) {
        throw new ErrorEntity("No users available", statusCode.notFound);
      }
      res.status(200).json({ success: true, data: userList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getUserCompanyList(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.getUserIdByToken(req);
      const companyList = await this.service.getUserCompanyList(userId);
      res.status(200).json({ success: true, data: companyList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async getUserOrderList(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.getUserIdByToken(req);
      const orderList = await this.service.getUserOrderList(userId);
      res.status(200).json({ success: true, data: orderList });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async createUserCompany(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.getUserIdByToken(req);
      const companyId = req.body.companyId;
      if (!Number.isInteger(companyId)) {
        throw new ErrorEntity(
          "Company id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.createUserCompany(userId, companyId);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }

  async deleteUserCompany(req: Request, res: Response): Promise<void> {
    try {
      const userId = await this.getUserIdByToken(req);
      const companyId = req.body.companyId;
      if (!Number.isInteger(companyId)) {
        throw new ErrorEntity(
          "Company id must be a positive integer",
          statusCode.badRequest
        );
      }
      await this.service.deleteUserCompany(userId, companyId);
      res.status(200).json({ success: true });
    } catch (err) {
      this.handleError(err, req, res);
    }
  }
}

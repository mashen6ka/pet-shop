import { Request } from "express";
import { AuthService } from "../service";
import { cookieName } from "../config";

export default abstract class BaseController {
  private authService: AuthService;

  constructor(userService: AuthService) {
    this.authService = userService;
  }

  protected async getUserIdByToken(req: Request): Promise<number> {
    const token = req.cookies[cookieName];
    if (!token) {
      throw "User is not authorized";
    }
    // throw if userId is null?
    return await this.authService.getUserIdByToken(token);
  }

  protected async checkWorkerToken(req: Request) {
    const token = req.cookies[cookieName];
    if (!token) {
      throw "User is not authorized";
    }
    const workerId = await this.authService.getUserIdByToken(token);
    if (!workerId) {
      throw "User does not have such permissions";
    }
  }
}

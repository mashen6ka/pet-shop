import { AuthService } from "../service";
import { cookieName } from "../config";
import { ErrorEntity } from "../entity/ErrorEntity";
import { Response, Request } from "express";
import log from "npmlog";
import { statusCode } from "../common";

export default abstract class BaseController {
  private authService: AuthService;

  constructor(userService: AuthService) {
    this.authService = userService;
  }

  handleError(error: ErrorEntity, req: Request, res: Response) {
    let errMessage, errCode;
    if (error instanceof ErrorEntity) {
      errMessage = error.message;
      errCode = error.statusCode;
    } else {
      // сюда еще мб для дебага добавить доп инфу
      errMessage = "Internal server error";
      errCode = 500;
    }
    log.error(
      "req",
      `dateTime: ${new Date().toLocaleString()}`,
      `err: ${JSON.stringify(errMessage)}`,
      `statusCode: ${JSON.stringify(errCode)}`,
      `path: ${JSON.stringify(req.route.path)}`,
      `body: ${JSON.stringify(req.body)}`,
      `query: ${JSON.stringify(req.query)}`,
      `cookies: ${JSON.stringify(req.cookies)}`
    );
    res.status(errCode).json({ success: false, error: errMessage });
  }

  protected async getUserIdByToken(req: Request): Promise<number> {
    const token = req.cookies[cookieName];
    if (!token) {
      throw new ErrorEntity("User is not authorized", statusCode.unauthorized);
    }

    const userId = await this.authService.getUserIdByToken(token);
    if (!userId) {
      throw new ErrorEntity("User is not authorized", statusCode.unauthorized);
    }
    return userId;
  }

  protected async checkWorkerToken(req: Request) {
    const token = req.cookies[cookieName];
    if (!token) {
      throw new ErrorEntity("User is not authorized", statusCode.unauthorized);
    }
    const workerId = await this.authService.getUserIdByToken(token);
    if (!workerId) {
      throw new ErrorEntity(
        "User does not have such permissions",
        statusCode.forbidden
      );
    }
  }
}

import log from "npmlog";
import jwt from "jsonwebtoken";
import { AuthService } from "../service";
import { cookieName } from "../config";
import { ErrorEntity } from "../entity/ErrorEntity";
import { Response, Request } from "express";
import { statusCode } from "../common";

interface JwtPayload {
  userId: number;
}

export default abstract class BaseController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  handleError(error: Error, req: Request, res: Response) {
    let errMessage, errCode;
    console.log(error);
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
      `err: ${JSON.stringify(error.message)}`,
      `statusCode: ${JSON.stringify(errCode)}`,
      `path: ${JSON.stringify(req.route.path)}`,
      `body: ${JSON.stringify(req.body)}`,
      `query: ${JSON.stringify(req.query)}`,
      `cookies: ${JSON.stringify(req.cookies)}`
    );
    log.error("stack", error.stack);
    res.status(errCode).json({ success: false, error: errMessage });
  }

  protected getUserIdByToken(req: Request): number {
    const token = req.cookies[cookieName];
    if (!token) {
      throw new ErrorEntity("User is not authorized", statusCode.unauthorized);
    }
    const { userId } = jwt.verify(token, process.env.TOKEN_KEY) as JwtPayload;
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
    const userId = this.getUserIdByToken(req);
    const worker = await this.authService.getWorkerByUserId(userId);

    if (!worker) {
      throw new ErrorEntity(
        "User does not have such permissions",
        statusCode.forbidden
      );
    }
  }
}

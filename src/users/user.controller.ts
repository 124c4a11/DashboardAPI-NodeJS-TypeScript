import { NextFunction, Request, Response } from "express";

import { BaseController } from "../common/base.controller"
import { LoggerService } from "../logger/logger.service";


export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);

    this.bindRouts([
      { path: '/register', method: 'post', func: this.register},
      { path: '/login', method: 'post', func: this.login }
    ]);
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'login');
  }
}

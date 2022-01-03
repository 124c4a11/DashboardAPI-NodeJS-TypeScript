import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';

import { BaseController } from '../common/base.controller';
import { TYPES } from '../types';
import { HTTPError } from '../errors/http-error.class';
import { LoggerService } from '../logger/logger.service';
import { IUserController } from './users.controller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { UserService } from './users.service';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.LoggerService) private loggerService: LoggerService,
    @inject(TYPES.UserService) private userService: UserService,
  ) {
    super(loggerService);

    this.bindRouts([
      { path: '/register', method: 'post', func: this.register },
      { path: '/login', method: 'post', func: this.login },
    ]);
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.createUser(body);

    if (!result) {
      return next(new HTTPError(422, 'User already exists'));
    }

    this.ok(res, result);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
    next(new HTTPError(401, 'login error', 'login'));
    // this.ok(res, 'login');
  }
}

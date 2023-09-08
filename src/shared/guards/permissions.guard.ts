import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PERMISSION_KEY } from '../decorators/permission.decorator';
import { BusinessException } from '../exceptions/business.exception';
import { ERROR, MODULE } from '../utilities/constants';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const neededPermission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );

    if (!neededPermission) return true;

    try {
      const request = context.switchToHttp().getRequest();
      const userPermissions =
        JSON.parse(request.headers['user-permissions']) || [];

      const hasPermission = userPermissions.find(
        (permission) => permission.id === neededPermission,
      );

      if (!hasPermission) {
        throw new BusinessException(
          MODULE.VESSEL,
          [ERROR.NOT_HAVE_PERMISSION],
          HttpStatus.FORBIDDEN,
        );
      }
    } catch {
      throw new BusinessException(
        MODULE.VESSEL,
        [ERROR.NOT_HAVE_PERMISSION],
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}

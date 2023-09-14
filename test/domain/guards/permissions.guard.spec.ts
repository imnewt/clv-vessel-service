import { Reflector } from '@nestjs/core';
import { HttpStatus } from '@nestjs/common';

import { PermissionGuard } from '@domain/guards/permissions.guard';
import { BusinessException } from '@domain/exceptions/business.exception';
import { ERROR, MODULE } from '@domain/utilities/constants';

describe('PermissionGuard', () => {
  let permissionGuard: PermissionGuard;

  beforeEach(() => {
    const reflector = {
      get: jest.fn(),
    };
    permissionGuard = new PermissionGuard(reflector as any);
  });

  it('should allow access when no permission is needed', async () => {
    const canActivateResult = await permissionGuard.canActivate({
      switchToHttp: () => ({ getRequest: () => ({}) }),
      getHandler: () => 'handler',
    } as any);

    expect(canActivateResult).toBe(true);
  });

  it('should allow access when user has the needed permission', async () => {
    const reflector = new Reflector();
    reflector.get = jest.fn().mockReturnValue('needed_permission');

    const canActivateResult = await permissionGuard.canActivate({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'user-permissions': JSON.stringify([{ id: 'needed_permission' }]),
          },
        }),
      }),
      getHandler: () => 'handler',
    } as any);

    expect(canActivateResult).toBe(true);
  });

  it('should throw exception when user does not have the needed permission', async () => {
    const reflector = new Reflector();
    reflector.get = jest.fn().mockReturnValue('needed_permission');

    try {
      await permissionGuard.canActivate({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              'user-permissions': JSON.stringify([{ id: 'other_permission' }]),
            },
          }),
        }),
        getHandler: () => 'handler',
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessException);
      expect(error.module).toBe(MODULE.VESSEL);
      expect(error.errors).toEqual([ERROR.NOT_HAVE_PERMISSION]);
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });

  it('should throw exception when parsing user-permissions fails', async () => {
    const reflector = new Reflector();
    reflector.get = jest.fn().mockReturnValue('needed_permission');

    try {
      await permissionGuard.canActivate({
        switchToHttp: () => ({
          getRequest: () => ({
            headers: {
              'user-permissions': 'invalid_json',
            },
          }),
        }),
        getHandler: () => 'handler',
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(BusinessException);
      expect(error.module).toBe(MODULE.VESSEL);
      expect(error.errors).toEqual([ERROR.NOT_HAVE_PERMISSION]);
      expect(error.status).toBe(HttpStatus.FORBIDDEN);
    }
  });
});

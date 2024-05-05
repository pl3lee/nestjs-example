import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BeltGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // parse the request object from the context
    const request = context.switchToHttp().getRequest();

    // validate request
    // const hasBlackBelt = request.headers['x-black-belt'] === 'true';

    // return hasBlackBelt;
    return true;
  }
}

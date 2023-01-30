import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
     
     constructor (private authService: AuthService) {}

     async canActivate(
          context: ExecutionContext,
     ): Promise<boolean> {
          const req = context.switchToHttp().getRequest();

          const header = req.headers["authorization"];

          if (!header && !header.startsWith("Bearer")) throw new HttpException("Unauthenticated", HttpStatus.UNAUTHORIZED);
          
          const user = await this.authService.validateToken(header.split(" ")[1]);

          if (!user) throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

          req.user = user;

          return true;
     }
}
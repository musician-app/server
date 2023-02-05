import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { LoginRequestDto } from "./dto/login-request.dto";
import { AuthService } from "./auth.service";
import { RegisterRequestDto } from "./dto/register.dto";
import { PrismaService } from "../prisma/prisma.service";
import { hash } from "bcrypt";
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { LoginResponseDto } from "./dto/login-response.dto";

@Controller({
     path: "auth"
})
@ApiTags("auth")
export class AuthController {

     constructor(private authService: AuthService, private prismaService: PrismaService) {}

     @Post("login")
     @ApiOperation({ description: "Authenticate as a user", summary: "Log in" })
     @ApiOkResponse({ description: "Returns token and the user object" })
     @ApiUnauthorizedResponse({ description: "Username or password provided was incorrect" })
     async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
          const [user, token] = await this.authService.validateUser(body.username, body.password);

          if (!token) throw new HttpException("Username or password provided was incorrect", HttpStatus.UNAUTHORIZED);

          const { passwordHash: __, tokens: _, ...res } = user;

          return { user: res, token } as LoginResponseDto;
     }

     @Post("register")
     @ApiOperation({ description: "Register using username, email and password", summary: "Create a user" })
     @ApiOkResponse({ description: "Returns token and the user object" })
     @ApiBadRequestResponse({ description: "Invalid body" })
     @ApiBadRequestResponse({ description: "Username already exists" })
     @ApiBadRequestResponse({ description: "Email already exists" })
     async register(@Body(ValidationPipe) body: RegisterRequestDto): Promise<LoginResponseDto> {
          body.email = body.email.toLowerCase();

          let user = await this.prismaService.user.findFirst({ where: { 
               OR: [{
                    username: body.username
               }, {
                    email: {
                         mode: "insensitive",
                         equals: body.email
                    }
               }]
          }});

          if (user) {
               if (user.username === body.username) throw new HttpException("Kullanıcı adı zaten kullanımda", HttpStatus.BAD_REQUEST);
               if (user.email === body.email) throw new HttpException("Email zaten kayıtlı", HttpStatus.BAD_REQUEST);
          }

          const passwordHash = await hash(body.password, 10);

          const { password: _, ...userCreateInvocation } = body;

          user = await this.prismaService.user.create({
               data: {
                    ...userCreateInvocation,
                    passwordHash
               }
          });

          const { passwordHash: __, ...res } = user;

          return { user: res, token: await this.authService.grantToken(user.id) };
     }

}
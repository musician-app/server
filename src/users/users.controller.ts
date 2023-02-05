import { Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { ApiBadGatewayResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserGetDto } from "./dto/user-get.dto";
import { UserGetAllDto } from "./dto/user-get-all.dto";
import { OptionalParameterPipe } from "../pipes/optional-parameter.pipe";
import { ApiRequiresAuth } from "../decorators/api-requires-auth";
import { AuthenticatedUser } from "../decorators/user.decorator";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaUserGetDtoSelect } from "./users.constants";

@Controller({
     path: "users"
})
@ApiTags("user")
@ApiRequiresAuth()
export class UsersController {
     constructor(private readonly prismaService: PrismaService) {}

     //TODO: Proper recommendation API
     @Get("get-all")
     @ApiOperation({ description: "Returns a list of users (15 per request)", summary: "List all users in the app" })
     @ApiQuery({
          name: "cursor",
          description: "The ID of the last user received.",
          required: false
     })
     @ApiOkResponse({ description: "Successful operation", type: UserGetAllDto })
     @ApiBadGatewayResponse({ description: "Validation failed (uuid is expected)" })
     async getAll(@Query("cursor", new OptionalParameterPipe(ParseUUIDPipe)) cursor?: string): Promise<UserGetAllDto> {
          const users = await this.prismaService.user.findMany({
               cursor: cursor ? {
                    id: cursor
               } : void(0),
               take: 15,
               select: PrismaUserGetDtoSelect
          });

          return {
               users: users.map(user => ({ ...user, ...user._count, _count: void(0) })),
               cursor: users.length ? users[users.length - 1].id : null
          } as UserGetAllDto;
     }

     @Get("@me")
     @ApiOperation({ description: "Returns the current user", summary: "Get authenticated user" })
     @ApiOkResponse({ description: "Successful operation", type: UserGetDto })
     @ApiNotFoundResponse({ description: "User not found" })
     async me(@AuthenticatedUser() user: User): Promise<UserGetDto> {
          return this.byUUID(user.id);
     }

     @Get(":id")
     @ApiOperation({ description: "Returns a single user", summary: "Find user by UUID" })
     @ApiOkResponse({ description: "Successful operation", type: UserGetDto })
     @ApiNotFoundResponse({ description: "User not found" })
     async byUUID(@Param("id", ParseUUIDPipe) id: string): Promise<UserGetDto> {
          const user = await this.prismaService.user.findUnique({ 
               where: { id },
               select: PrismaUserGetDtoSelect
          });

          if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

          return { ...user, ...user._count, _count: void(0) } as UserGetDto;
     }
}

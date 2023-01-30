import { Controller, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBadGatewayResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { UserGetDto } from "./dto/user-get.dto";
import { UserFindAllDto } from "./dto/user-findAll.dto";
import { OptionalParameterPipe } from "src/pipes/OptionalParameterPipe";
import { ApiAuthRequires as ApiRequiresAuth } from "src/decorators/apiAuthRequires";

@Controller({
     path: "users"
})
@ApiTags("user")
@ApiRequiresAuth()
export class UsersController {
     constructor(private readonly userService: UsersService) {}

     //TODO: Proper recommendation API
     @Get("findAll")
     @ApiOperation({ description: "Returns a list of users (15 per request)", summary: "List all users in the app" })
     @ApiQuery({
          name: "cursor",
          description: "The ID of the last user received.",
          required: false
     })
     @ApiOkResponse({ description: "Successful operation", type: UserFindAllDto })
     @ApiBadGatewayResponse({ description: "Validation failed (uuid is expected)" })
     async findAll(@Query("cursor", new OptionalParameterPipe(ParseUUIDPipe)) cursor?: string): Promise<UserFindAllDto> {
          const users = await this.userService.users({
               cursor: cursor ? {
                    id: cursor
               } : void(0),
               take: 15,
               select: {
                    id: true,
                    username: true,
                    avatar: true,
                    firstName: true,
                    lastName: true,
                    _count: {
                         select: {
                              followers: true,
                              following: true
                         }
                    }
               }
          });

          return {
               users: users.map(user => ({ ...user, ...user._count, _count: void(0) })),
               cursor: users.length ? users[users.length - 1].id : null
          } as UserFindAllDto;
     }

     @Get(":id")
     @ApiOperation({ description: "Returns a single user", summary: "Find user by UUID" })
     @ApiOkResponse({ description: "Successful operation", type: UserGetDto })
     @ApiNotFoundResponse({ description: "User not found" })
     async find(@Param("id", ParseUUIDPipe) id: string): Promise<UserGetDto> {
          const user = await this.userService.user({ id }, {
               id: true,
               username: true,
               avatar: true,
               firstName: true,
               lastName: true,
               _count: {
                    select: {
                         followers: true,
                         following: true
                    }
               }
          });

          if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);

          return { ...user, ...user._count, _count: void(0) } as UserGetDto;
     }
}

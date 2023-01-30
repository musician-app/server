import { ApiProperty } from "@nestjs/swagger";
import { UserGetDto } from "./user-get.dto";

export class UserFindAllDto {
     @ApiProperty({ type: [UserGetDto] })
     users: UserGetDto[];

     @ApiProperty({ description: "ID of the last user" })
     cursor: string | null;
}
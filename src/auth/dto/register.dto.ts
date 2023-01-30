import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword, IsUrl, Matches } from "class-validator";

export class RegisterRequestDto {

     @ApiProperty()
     @Matches(/[a-z][a-z0-9-_]{3,16}/, { message: "username is not valid" })
     username: string;

     @ApiProperty()
     @IsEmail()
     email: string;

     @ApiProperty()
     @IsUrl()
     avatar: string;

     @ApiProperty()
     firstName: string;

     @ApiProperty()
     lastName: string;

     @ApiProperty()
     @IsStrongPassword({ minUppercase: 0, minSymbols: 0 })
     password: string;
}

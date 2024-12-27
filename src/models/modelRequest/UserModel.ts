import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginModel{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    username:string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @MinLength(8)
    password:string;
}
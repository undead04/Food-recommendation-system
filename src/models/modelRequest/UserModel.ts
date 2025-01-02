import { ArrayNotEmpty, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

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
export class UserModel{
    @IsInt()
    @Min(1)
    @Max(5)
    spice_preference: number;  // Độ cay yêu thích của người dùng (1-5)
    @IsInt()
    @Min(1)
    @Max(5)
    sweetness_preference: number;  // Độ ngọt yêu thích của người dùng (1-5)
    @IsInt()
    @Min(1)
    @Max(5)
    saltiness_preference: number;  // Độ mặn yêu thích của người dùng (1-5)
    @IsString()
    description: string;  // 
    @IsInt()
    regionId:number;
}
export class PasswordModel{
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    oldPassword:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    newPassword:string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    confirmPassword:string
}
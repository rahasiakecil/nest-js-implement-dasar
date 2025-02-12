import { IsNotEmpty, IsString } from "class-validator";

export class verifyPasswordAuthDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
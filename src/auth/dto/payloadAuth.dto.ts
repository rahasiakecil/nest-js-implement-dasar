import { IsNotEmpty, IsString } from "class-validator";

export class payloadAuthDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    fullname: string;
}
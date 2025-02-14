import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class refreshTokenAuthDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, isArray:false, default: "abcsddasdf"})
    refresh_token: string;
}
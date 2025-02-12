import { Body, Controller, Get, Post, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginAuthDto } from './dto/login.dto';
import { NoJwt } from 'src/decorators/no-jwt.decorator';

// @NoJwt()//BISA DI PASANG DI CONTROLLER UNTUK ALL ENDPOINT
@Controller('auth')
export class AuthController {
    constructor(
        private authservice: AuthService
    ){}

    @NoJwt() // DI PASANG DI ENDPOINT TERTENTU
    @Post('login')
    async login(
        @Body(new ValidationPipe()) body:loginAuthDto
    ){
        const data = await this.authservice.validateUser(body);
        if(!data){
            throw new UnauthorizedException();
        }
        return this.authservice.generateToken(data.data);
    }

    @NoJwt()
    @Post('refresh')
    async refresh(
        @Body() body:{refresh_token: string}
    ){
        const data = await this.authservice.refreshToken(body.refresh_token);
        if(!data){
            throw new UnauthorizedException();
        }
        return data;
    }

    @Post('generate-password')
    async generatePassword(
        @Body() body:{password: string}
    ){
        const data = await this.authservice.generatePassword(body.password);
        if(!data){
            throw new UnauthorizedException();
        }
        return data;
    }

    @Post('verify-password')
    async verifyPassword(
        @Body() body:{username: string, password: string}
    ){
        const data = await this.authservice.verifyPassword(body);
        if(!data){
            throw new UnauthorizedException();
        }
        return data;
    }

    //buat list daftar hitam refresh token
}

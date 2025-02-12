import { Injectable } from '@nestjs/common';
import { validateUserJobs } from './jobs/validateUserJobs';
import { generatePasswordJobs } from './jobs/loginUserJobs';
import { JwtService } from '@nestjs/jwt';
import { payloadAuthDto } from './dto/payloadAuth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { verifyPasswordJobs } from './jobs/verifyPasswordUserJobs';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async generateToken(data: payloadAuthDto): Promise <{
        success: boolean,
        status: number,
        message: string,
        data:any
    }>{
        try {
            //PAYLOAD UNTUK DISAVE DI JWT
            const payload = {
                username: data.username,
                fullname: data.fullname
            }
            //GENERATE TOKEN
            const accessToken = this.jwtService.sign(payload);//settingan di auth
            const refreshToken = this.jwtService.sign(payload,  { expiresIn: '7d' });//7 hari
            //PROCESS SAVE LIST REFRESH TOKEN
            const {saveRefreshToken} = await this.prisma.$transaction(async (tr) => {
                const saveRefreshToken = await tr.mstRefreshToken.create({
                    data:{
                        refresh_token: refreshToken,
                        is_active: true
                    }
                });
                return {saveRefreshToken};
            });
            //RETURN DATA
            const listToken = {
                access_token: accessToken,
                refresh_token: refreshToken
            }
            const dataReturns = {
                success: false,
                status: 200,
                message: 'Succesfully !',
                data: listToken
            }
            return dataReturns;
        } catch (error) {
            return error.message;
        }
    }

    async refreshToken(sednRefreshToken: string): Promise <{
        success: boolean,
        status: number,
        message: string,
        data:any
    }>{
        try {
            const data = this.jwtService.verify(sednRefreshToken);
            const payload = {
                username: data.username,
                fullname: data.fullname
            }
            const newAccessToken = this.jwtService.sign(payload);
            const listToken = {
                access_token: newAccessToken
            }
            const dataReturns = {
                success: false,
                status: 200,
                message: 'Succesfully !',
                data: listToken
            }
            return dataReturns;
        } catch (error) {
            return error.message;
        }
    }

    validateUser = validateUserJobs;
    generatePassword = generatePasswordJobs;
    verifyPassword = verifyPasswordJobs;
}

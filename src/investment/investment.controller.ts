import { Controller, Get, Headers } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { NoJwt } from 'src/decorators/no-jwt.decorator';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Investment')
@Controller('investment')
// @ApiBearerAuth() //JIKA DI SET UNTUK SEMUA ENDPOINT
export class InvestmentController {
    constructor(
        private readonly investmentService: InvestmentService
    ){}

    @NoJwt() //UNTUK ENP YG TIDAK DIPASANG JWT TOKEN
    @Get('test')
    async test(){
        return 'test';
    }

    @Get('user')
    @ApiBearerAuth()//UNTUK ENDPOINT TERTENTU
    async getUser(){
        return await this.investmentService.getDataInvestment();
    }

    @Get('using-header-token')
    @NoJwt()
    @ApiProperty({isArray: false})
    async setTest(
        @Headers('x-token-wajib') token: string
    ){
        return token;
    }
}

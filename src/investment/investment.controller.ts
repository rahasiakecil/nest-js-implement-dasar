import { Controller, Get } from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { NoJwt } from 'src/decorators/no-jwt.decorator';

@Controller('investment')
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
    async getUser(){
        return await this.investmentService.getDataInvestment();
    }
}

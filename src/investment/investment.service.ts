import { Injectable } from '@nestjs/common';
import { getInvestmentJobs } from './jobs/getInvestmentJobs';

@Injectable()
export class InvestmentService {

    getDataInvestment=getInvestmentJobs;
}

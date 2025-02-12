import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { InvestmentService } from './investment/investment.service';
import { InvestmentModule } from './investment/investment.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt/jwt.guard';

@Module({
  imports: [AuthModule, PrismaModule, InvestmentModule],
  controllers: [AppController],
  providers: [AppService, InvestmentService,{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { JwtAuthGuard } from 'src/jwt/jwt.guard';

@Module({
  imports:[//INI JIKA INGIN MEMASANG PENGATURAN DI MODULE
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn: '5m'} // 5 menit
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtAuthGuard, JwtStrategy]
})
export class AuthModule {}

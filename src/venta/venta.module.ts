import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [VentaService,PrismaService],
  controllers: [VentaController]
})
export class VentaModule {}

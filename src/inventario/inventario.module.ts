import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [InventarioService,PrismaService],
  controllers: [InventarioController]
})
export class InventarioModule {}

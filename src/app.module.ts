import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { InventarioModule } from './inventario/inventario.module';
import { VentaModule } from './venta/venta.module';

@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public/uploads'), // Carpeta pública
    serveRoot: '/public/uploads', // URL base para acceder a los archivos
  }),CategoriaModule,CategoriaModule, ProductoModule, InventarioModule, VentaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

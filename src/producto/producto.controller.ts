import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { createProduct } from './dto/create-product';
import { ProductoService } from './producto.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multerOptions from 'src/config/multer.config';

@Controller('producto')
export class ProductoController {

    constructor(private productoService:ProductoService){}

    @Post()
    @UseInterceptors(FileInterceptor('imagen', multerOptions))
    async registrar(@Body() data:createProduct, @UploadedFile() imagen: Express.Multer.File){
        return await this.productoService.newProducto(data, imagen)
    }

    @Get()
    async listaCompleta(){
        return await this.productoService.getAll();
    }

    @Get(':id')
    async obtenerProducto(@Param('id') id:string){
        return await this.productoService.getById(parseInt(id))
    }

}

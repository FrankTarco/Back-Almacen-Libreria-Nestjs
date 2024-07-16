import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoria } from './dto/create-categoria.dto';

@Controller('categoria')
export class CategoriaController {

    constructor(private service:CategoriaService){}

    @Get()
    listarCategorias(){
        return this.service.listarCategoria();
    }

    @Post()
    registrar(@Body() obj:CreateCategoria){
        obj.updateAt = new Date()
        return this.service.registrarCategoria(obj);
    }

    @Get(':id')
    obtener(@Param('id') id:string){
        return this.service.obtenerPorId(parseInt(id))
    }

    @Delete(':id')
    eliminar(@Param('id') id:string){
        return this.service.deleteCategoria(parseInt(id))
    }

    
    @Put(':id')
    async actualizar(@Body() obj:CreateCategoria, @Param('id') id:string){
            const encontrar = await this.service.obtenerPorId(parseInt(id))
            if(!encontrar) throw new NotFoundException('No se encontro datos')
            
            obj.updateAt = new Date()
            return await this.service.actualizarCategoria(parseInt(id),obj)
    }

}

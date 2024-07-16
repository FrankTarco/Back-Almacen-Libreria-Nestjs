import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventario } from './dto/create-inventario.dto';

@Controller('inventario')
export class InventarioController {

    constructor(private inventarioService:InventarioService){}

    @Post()
    nuevoInventario(@Body() data:CreateInventario){
        return this.inventarioService.registrar(data)
    }

    @Get()
    listarInventarios(){
        return this.inventarioService.listar()
    }

}

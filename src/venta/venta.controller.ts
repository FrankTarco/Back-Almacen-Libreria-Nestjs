import { Body, Controller, Post } from '@nestjs/common';
import { VentaService } from './venta.service';
import { Transaccion } from './dto/transaccion.dto';

@Controller('venta')
export class VentaController {

    constructor(private ventaService:VentaService){}

    @Post()
    registrarVenta(@Body() data:Transaccion){
        return this.ventaService.registrarVenta(data)
    }

}

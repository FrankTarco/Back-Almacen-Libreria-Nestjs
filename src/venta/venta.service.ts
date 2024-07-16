import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Transaccion } from './dto/transaccion.dto';

@Injectable()
export class VentaService {

    constructor(private prismaService:PrismaService){}

    async registrarVenta(obj:Transaccion){

        const { cliente, venta } = obj
        const {usuarioId, precioTotal, detalles} = venta
        const regCli:any = await this.prismaService.cliente.create({
            data:cliente
        })


        return await this.prismaService.venta.create({
            data:{
                clienteId:regCli.id,
                usuarioId,
                precioTotal,
                detalle:{
                    create: detalles.map( de=> ({
                        productoId: de.productoId,
                        cantindad: de.cantidad,
                        precio: de.precio
                    }))
                }
            }
        });
    }

}

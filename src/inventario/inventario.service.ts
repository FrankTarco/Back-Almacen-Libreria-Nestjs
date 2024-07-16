import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateInventario } from './dto/create-inventario.dto';

@Injectable()
export class InventarioService {

    constructor(private prismaService:PrismaService){}

    async listar(){
        return this.prismaService.inventario.findMany({
            include:{
                producto:true,
            }
        })
    }

    async registrar(data:CreateInventario){ 
            await this.prismaService.$transaction( async (prisma) => {
                const producto = await this.prismaService.producto.findUnique({
                    where:{
                        id:data.productoId,
                    }
                });
                if(!producto){throw new HttpException('El producto no existe',404)}
                
                if(data.motivo !== 'SALIDA' && data.motivo !=='INGRESO'){throw new HttpException('Accion no valida en el inventiario',404)} 

                if(data.motivo === 'SALIDA' && producto.stock === 0){ throw new HttpException('El stock del producto esta en 0',404)}

                const stockActual = data.motivo === 'SALIDA'
                ? producto.stock - data.cantidad 
                : producto.stock + data.cantidad;
                
                const regInve = {...data, stockAnterior:producto.stock, stockActual};
                const prodUpdate = {...producto, stock:stockActual}
                
                await this.completarRegistro(regInve,prodUpdate)
            });
    }

    async completarRegistro(inve:any,prod:any){
        await this.prismaService.inventario.create({data:inve})
            await this.prismaService.producto.update({
                where:{id:prod.id },
                data:prod
            });
    }
}

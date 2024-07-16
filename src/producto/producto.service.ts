import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductoEntity } from './entity/product.entity';
import { createProduct } from './dto/create-product';

@Injectable()
export class ProductoService {

    constructor(private prismaService:PrismaService){}

    async newProducto(data:createProduct, imagen: Express.Multer.File){

        try{
            await this.prismaService.$transaction(async (prisma)=> {
                const { nombre, descripcion, marca, stock, precioCosto, precioVenta, categoriaId } = data;
                const imagenUrl = imagen.path.replace(/\\/g, '/');
                const resultado:ProductoEntity = await this.prismaService.producto.create({data:{
                    nombre,
                    descripcion,
                    marca,
                    stock:Number(stock),
                    precioCosto:Number(precioCosto),
                    precioVenta:Number(precioVenta),
                    categoriaId:Number(categoriaId),
                    imagen:imagenUrl,
                    updateAt:new Date(),
                },});

                await this.prismaService.inventario.create({
                    data:{
                        productoId:resultado.id,
                        motivo:'Ingreso de nuevo producto',
                        cantidad:resultado.stock,
                        stockAnterior:0,
                        stockActual:resultado.stock,
                    }
                });
            });

        }catch (error){
            throw new InternalServerErrorException('Salio mal el registro del producto')
        }
    }

    async getAll(){
        return this.prismaService.producto.findMany({
            include:{
                Categoria: true,
            }
        })
    }

    async getById(id:number){
        return this.prismaService.producto.findUnique({
            where:{
                id
            }, include:{
                Categoria:true
            }
        })
    }

    async deleteProducto(id:number){
        return this.prismaService.producto.delete({
            where:{
                id
            }
        })
    }




}

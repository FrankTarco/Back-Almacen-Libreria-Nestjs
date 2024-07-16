import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoria } from './dto/create-categoria.dto';
import { Categoria } from './entity/categoria.entity';

@Injectable()
export class CategoriaService {

    constructor(private prismaService:PrismaService){}

    async listarCategoria(){
        return this.prismaService.categoria.findMany();
    }

    async registrarCategoria(data:CreateCategoria): Promise<Categoria>{
        return this.prismaService.categoria.create({data}) 
    }

    async obtenerPorId(id:number):Promise<Categoria>{
        return this.prismaService.categoria.findUnique({
            where:{
                id
            }
        })
    }

    async actualizarCategoria(idCate:number,cate:CreateCategoria): Promise<Categoria>{
        return this.prismaService.categoria.update({
            where: {
                id:idCate
            }, data: cate
        })
    }

    async deleteCategoria(id:number): Promise<void>{

        const categoria = await this.prismaService.categoria.findUnique({
            where:{
                id
            },
            include:{
                producto: true
            },
        });

        if(!categoria){ throw new NotFoundException('La categoria no ha sido encontrada')}

        if(categoria.producto.length>0){ throw new BadRequestException('No se puede eliminar una categoria asociado a un producto')}
        
        await this.prismaService.categoria.delete({
            where:{
                id
            }
        });
    }

}

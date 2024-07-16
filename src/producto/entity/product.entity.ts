import { Categoria } from "src/categoria/entity/categoria.entity"


export class ProductoEntity{
    id:number
    nombre:string
    descripcion:string
    marca:string
    stock:number
    precioCosto:number
    precioVenta:number
    categoriaId:number
    imagen:string
    createAt:Date
    updateAt:Date
  
  }
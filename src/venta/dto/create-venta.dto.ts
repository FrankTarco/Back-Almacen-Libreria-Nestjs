import { CreateDetalle } from "./create-detalle.dto";

export class createVenta{

    precioTotal:number;
    clienteId:number;
    usuarioId:number;
    detalles:CreateDetalle[];
}
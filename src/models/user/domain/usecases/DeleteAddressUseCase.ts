import { Inject } from "@nestjs/common";
import { UserRepository } from "../respository/UserRepository";
import { ResponseDocument } from "../entity/response/ResponseDocument";

export class DeleteAddress{
    constructor(@Inject("UserRepository") private readonly userRepository: UserRepository){}

    async execute(userId:string, addresId:string):Promise<ResponseDocument>{
        
        const user = await this.userRepository.findById(userId)
        if(!user)return new ResponseDocument(false,"usuario no encontrado")
        
        user.deleteAddress(addresId)
        
        const res = await this.userRepository.update(user)
        if(!res)return new ResponseDocument(false,"problemas de servidor")
        return new ResponseDocument(true, "se elimino correctamente la direccion")
    }
}
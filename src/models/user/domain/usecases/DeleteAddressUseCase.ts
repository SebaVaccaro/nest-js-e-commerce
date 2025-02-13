import { Inject } from "@nestjs/common";
import { UserRepository } from "../respository/UserRepository";
import { User } from "../entity/user/User";

export class DeleteAddress{
    constructor(@Inject("UserRepository") private readonly userRepository: UserRepository){}

    async execute(userId:string, addresId:string):Promise<User|string>{
        const user = await this.userRepository.findById(userId)
        if(!user)return "usuario no encontrado"
        user.deleteAddress(addresId)
        const res = await this.userRepository.update(user)
        if(!res)return "no fue posible actualizar el usuario, errore de servidor"
        return res
    }
}
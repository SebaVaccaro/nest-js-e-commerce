import { Inject } from "@nestjs/common"
import { UserRepository } from "../respository/UserRepository"
import { Address } from "../entity/address/Address"
import { User } from "../entity/user/User"
import { AddressUserDto } from "../../application/dtos/address-user.dto"
import { v4 as uuidv4 } from 'uuid';

export class AddAddressUseCase{
    constructor(@Inject("UserRepository") private readonly userRepository: UserRepository){}
    async execute(addres:AddressUserDto):Promise<User | string>{
        const user = await this.userRepository.findById(addres._id)
        if(!user)return "usuario no encontrado"
        const _id = uuidv4()
        const address = new Address(addres.street, addres.city,addres.state,addres.country, _id)
        user.addAddress(address)
        const res = await this.userRepository.update(user)
        return res? res: "no fue posible actializar"
    }
}
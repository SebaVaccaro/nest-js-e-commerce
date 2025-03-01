import { Inject } from "@nestjs/common"
import { UserRepository } from "../respository/UserRepository"
import { Address } from "../entity/address/Address"
import { AddressUserDto } from "../../application/dtos/address-user.dto"
import { v4 as uuidv4 } from 'uuid';
import { UserRes } from "../entity/user/UserRes"
import { ResponseDocument } from "../entity/response/ResponseDocument";

export class AddAddressUseCase{
    constructor(@Inject("UserRepository") private readonly userRepository: UserRepository){}
    async execute(addres:AddressUserDto):Promise<ResponseDocument>{
        
        const user = await this.userRepository.findById(addres._id)
        if(!user) return new ResponseDocument(false,"usuario no econtrado")
        
        const _id = uuidv4()
        
        const address = new Address(addres.street, addres.city,addres.state,addres.country, _id)
        user.addAddress(address)
        
        const res = await this.userRepository.update(user)
        if(!res) return new ResponseDocument(false, "error de servidor")
        
        const userRes = new UserRes(res?._id, res?.email,res?.status,res?.addressData, res?.favoritesData, res?.shoppingData, res?.createdAt, res?.updatedAt)
        return new ResponseDocument(true, "se agrego la direccion correctamente", userRes)
    }
}
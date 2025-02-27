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
        
        if(!user){
            const res = new ResponseDocument(false,"usuario no econtrado")
            return res
        }
        
        const _id = uuidv4()
        const address = new Address(addres.street, addres.city,addres.state,addres.country, _id)
        user.addAddress(address)
        const res = await this.userRepository.update(user)
        
        if(!res){
            const res = new ResponseDocument(false, "error de servidor")
            return res
        }
        
        const userRes = new UserRes(res?._id, res?.email,res?.status,res?.addressData, res?.favoritesData, res?.shoppingData, res?.createdAt, res?.updatedAt)
        
        const response = new ResponseDocument(true, "se agrego la direccion correctamente", userRes)
        
        return response
    }
}

import { Injectable } from "@nestjs/common";
import { RegisterUserUseCase } from "../../domain/usecases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../domain/usecases/LoginUserUseCase";
import { RegisterUserDto } from "../../application/dtos/register-user.dto";
import { LoginUserDto } from "../../application/dtos/login-user.dto";
import { PasswordUserDto } from "../../application/dtos/password-user.dtp";
import { ChangePasswordUseCase } from "../../domain/usecases/ChangePasswordUseCase";
import { AddAddressUseCase } from "../../domain/usecases/AddAddressUseCase";
import { AddressUserDto } from "../../application/dtos/address-user.dto";
import { DeleteAddress } from "../../domain/usecases/DeleteAddressUseCase";
import { DeleteAddressUserDto } from "../../application/dtos/delete-address-user.dto";
import { ResponseDocument } from "../../domain/entity/response/ResponseDocument";

@Injectable()
export class UserService{
    constructor(
        private readonly registerUser: RegisterUserUseCase,
        private readonly loginUser: LoginUserUseCase,
        private readonly changePassword: ChangePasswordUseCase,
        private readonly address: AddAddressUseCase,
        private readonly deleteAddress: DeleteAddress
    ){}
    
    
    async register(registerUserDto: RegisterUserDto):Promise<ResponseDocument>{
        const res = await this.registerUser.execute(registerUserDto.username, registerUserDto.email, registerUserDto.password)
        return res
    }

    async login(loginUserDto: LoginUserDto): Promise<ResponseDocument>{
        const res = await this.loginUser.execute(loginUserDto.email, loginUserDto.password)
        return res
    }

    async updatePassword( updatePassword: PasswordUserDto ): Promise<ResponseDocument>{
        const res = await this.changePassword.execute(updatePassword._id, updatePassword.password)
        return res
    }

    async addAddress(address: AddressUserDto): Promise<ResponseDocument>{
        const res = await this.address.execute(address)
        return res
    }

    async putAddress(data: DeleteAddressUserDto): Promise<ResponseDocument>{
        const res = await this.deleteAddress.execute(data.userId, data.addressId)
        return res
    }

    async addFavorite(){

    }

    async putFavorite(){
        
    }
}
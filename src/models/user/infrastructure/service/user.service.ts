
import { Injectable } from "@nestjs/common";
import { RegisterUserUseCase } from "../../domain/usecases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../domain/usecases/LoginUserUseCase";
import { RegisterUserDto } from "../../application/dtos/register-user.dto";
import { User } from "../../domain/entity/user/User";
import { LoginUserDto } from "../../application/dtos/login-user.dto";
import { PasswordUserDto } from "../../application/dtos/password-user.dtp";
import { ChangePasswordUseCase } from "../../domain/usecases/ChangePasswordUseCase";
import { AddAddressUseCase } from "../../domain/usecases/AddAddressUseCase";
import { AddressUserDto } from "../../application/dtos/address-user.dto";
import { DeleteAddress } from "../../domain/usecases/DeleteAddressUseCase";
import { DeleteAddressUserDto } from "../../application/dtos/delete-address-user.dto";

@Injectable()
export class UserService{
    constructor(
        private readonly registerUser: RegisterUserUseCase,
        private readonly loginUser: LoginUserUseCase,
        private readonly changePassword: ChangePasswordUseCase,
        private readonly address: AddAddressUseCase,
        private readonly deleteAddress: DeleteAddress
    ){}
    
    
    async register(registerUserDto: RegisterUserDto):Promise<User| string>{
        const res = await this.registerUser.execute(registerUserDto.username, registerUserDto.email, registerUserDto.password)
        return res
    }

    async login(loginUserDto: LoginUserDto): Promise<User|string>{
        const res = await this.loginUser.execute(loginUserDto.email, loginUserDto.password)
        return res
    }

    async updatePassword( updatePassword: PasswordUserDto ): Promise<string | null>{
        const res = await this.changePassword.execute(updatePassword._id, updatePassword.password)
        return res? 'succesfull change password': null
    }

    async addAddress(address: AddressUserDto):Promise<User| string>{
        const res = await this.address.execute(address)
        return res
    }

    async putAddress(data: DeleteAddressUserDto):Promise<User|string>{
        const res = await this.deleteAddress.execute(data.userId, data.addressId)
        return res
    }
}
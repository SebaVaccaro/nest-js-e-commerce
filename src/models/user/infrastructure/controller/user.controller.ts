import { Body, Controller, Post, Put } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { User } from "../../domain/entity/user/User";
import { RegisterUserDto } from "../../application/dtos/register-user.dto";
import { LoginUserDto } from "../../application/dtos/login-user.dto";
import { PasswordUserDto } from "../../application/dtos/password-user.dtp";
import { AddressUserDto } from "../../application/dtos/address-user.dto";
import { DeleteAddress } from "../../domain/usecases/DeleteAddressUseCase";
import { DeleteAddressUserDto } from "../../application/dtos/delete-address-user.dto";
@Controller("user")
export class UserController{
    constructor(private readonly userService:UserService){}
    @Post("/register")
    async create(@Body() registerUserDto: RegisterUserDto):Promise<User|string>{
        return await this.userService.register(registerUserDto)
    }

    @Post("/login")
    async login(@Body() loginUserDto: LoginUserDto):Promise<User|string>{
        return await this.userService.login(loginUserDto)
    }

    @Post("/change-password")
    async changePassword(@Body() updatePassword: PasswordUserDto):Promise<string | null>{
        return await this.userService.updatePassword(updatePassword)
    }

    @Post("/address")
    async addAddress(@Body() addres: AddressUserDto): Promise<User| string>{
        return await this.userService.addAddress(addres)
    }

    @Put("/address")
    async deleteAddress(@Body() deleteAddress: DeleteAddressUserDto): Promise<User|string>{
        return await this.userService.putAddress(deleteAddress)
    }
}
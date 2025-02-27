import { Body, Controller, Post, Put } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { RegisterUserDto } from "../../application/dtos/register-user.dto";
import { LoginUserDto } from "../../application/dtos/login-user.dto";
import { PasswordUserDto } from "../../application/dtos/password-user.dtp";
import { AddressUserDto } from "../../application/dtos/address-user.dto";
import { DeleteAddressUserDto } from "../../application/dtos/delete-address-user.dto";
import { ResponseDocument } from "../../domain/entity/response/ResponseDocument";


@Controller("user")
export class UserController{
    constructor(private readonly userService:UserService){}
    @Post("/register")
    async create(@Body() registerUserDto: RegisterUserDto):Promise<ResponseDocument>{
        return await this.userService.register(registerUserDto)
    }

    @Post("/login")
    async login(@Body() loginUserDto: LoginUserDto):Promise<ResponseDocument>{
        return await this.userService.login(loginUserDto)
    }

    @Post("/password")
    async changePassword(@Body() updatePassword: PasswordUserDto):Promise<ResponseDocument>{
        return await this.userService.updatePassword(updatePassword)
    }

    @Post("/address")
    async addAddress(@Body() addres: AddressUserDto): Promise<ResponseDocument>{
        return await this.userService.addAddress(addres)
    }

    @Put("/address")
    async deleteAddress(@Body() deleteAddress: DeleteAddressUserDto): Promise<ResponseDocument>{
        return await this.userService.putAddress(deleteAddress)
    }
}
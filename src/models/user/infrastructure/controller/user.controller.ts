import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { User } from "../../domain/entity/user/User";
import { RegisterUserDto } from "../../application/dtos/register-user.dto";
import { LoginUserDto } from "../../application/dtos/login-user.dto";
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
}
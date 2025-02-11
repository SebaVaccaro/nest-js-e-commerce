
import { Injectable } from "@nestjs/common";
import { RegisterUserUseCase } from "../../domain/usecases/RegisterUserUseCase";
import { LoginUserUseCase } from "../../domain/usecases/LoginUserUseCase";
import { RegisterUserDto } from "../../application/dtos/register-user.dto";
import { User } from "../../domain/entity/user/User";
import { LoginUserDto } from "../../application/dtos/login-user.dto";

@Injectable()
export class UserService{
    constructor(
        private readonly registerUser: RegisterUserUseCase,
        private readonly loginUser: LoginUserUseCase
    ){}
    
    
    async register(registerUserDto: RegisterUserDto):Promise<User| string>{
        const res = await this.registerUser.execute(registerUserDto.username, registerUserDto.email, registerUserDto.password)
        return res
    }

    async login(loginUserDto: LoginUserDto): Promise<User|string>{
        const res = await this.loginUser.execute(loginUserDto.email, loginUserDto.password)
        return res
    }
}
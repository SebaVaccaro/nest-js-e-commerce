import { Inject } from "@nestjs/common";
import { UserRepository } from "../respository/UserRepository";
import * as bcrypt from 'bcrypt';
import { ResponseDocument } from "../entity/response/ResponseDocument";

export class ChangePasswordUseCase{
    constructor(@Inject("UserRepository") private readonly userRepository: UserRepository){}
    async execute(_id: string, newPassword: string):Promise<ResponseDocument>{
        const passwordHashed = await bcrypt.hash(newPassword, 10)
        const res = await this.userRepository.changePassword(_id, passwordHashed)
        if(!res) return new ResponseDocument(false, "error de servidor")
        return new ResponseDocument(true, "se cambio la contrasenia correctamente")
    }
}
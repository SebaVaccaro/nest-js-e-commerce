import { Inject } from "@nestjs/common";
import { UserRepository } from "../respository/UserRepository";
import * as bcrypt from 'bcrypt';

export class ChangePasswordUseCase{
    constructor(@Inject("UserRepository") private readonly userRepository: UserRepository){}
    async execute(_id: string, newPassword: string):Promise<string | null>{
        const passwordHashed = await bcrypt.hash(newPassword, 10)
        const res = await this.userRepository.changePassword(_id, passwordHashed)
        return res? res: null
    }
}
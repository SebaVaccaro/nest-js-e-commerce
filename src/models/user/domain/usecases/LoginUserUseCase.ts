import { Inject } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "../respository/UserRepository";
import { User } from "../entity/user/User";
export class LoginUserUseCase {
    constructor(@Inject("UserRepository") private readonly db: UserRepository) { }
    async execute(email: string, password: string): Promise<User | string> {
        const user = await this.db.findByEmail(email)
        if (!user) return "email no encontrado"

        const passRes = await this.db.getPassword(user._id)
        if(!passRes) return "password no encontrado"
        
        const matchPassword = await bcrypt.compare(password, passRes.password)
        if (!matchPassword) return "contrasenia invalida"
        
        return user
    }
}
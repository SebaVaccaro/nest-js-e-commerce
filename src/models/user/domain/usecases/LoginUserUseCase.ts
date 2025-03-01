import { Inject } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserRepository } from "../respository/UserRepository";
import { ResponseDocument } from "../entity/response/ResponseDocument";
import { UserRes } from "../entity/user/UserRes";

export class LoginUserUseCase {
    constructor(@Inject("UserRepository") private readonly db: UserRepository) { }
    async execute(email: string, password: string): Promise<ResponseDocument> {
        
        const user = await this.db.findByEmail(email)
        if (!user) return new ResponseDocument(false,"usuario no econtrado")

        const passRes = await this.db.getPassword(user._id)
        if(!passRes) return new ResponseDocument(false, "password no encontrado")
        
        const matchPassword = await bcrypt.compare(password, passRes.password)
        if (!matchPassword) return new ResponseDocument(false, "password invalida")
        
        const userRes = new UserRes(user?._id, user?.email,user?.status,user?.addressData, user?.favoritesData, user?.shoppingData, user?.createdAt, user?.updatedAt)
        return new ResponseDocument(true, "login existoso", userRes)
    }
}
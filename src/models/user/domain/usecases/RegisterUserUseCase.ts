import { Inject } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from "../respository/UserRepository";
import { User } from "../entity/user/User";
import { ResponseDocument } from "../entity/response/ResponseDocument";

export class RegisterUserUseCase{
    constructor(@Inject("UserRepository") private readonly db:UserRepository){}
    async execute(username: string, email: string, password: string):Promise<ResponseDocument>{
        
        const verifyEmail = await this.db.findByEmail(email)
        if(verifyEmail)return new ResponseDocument(false,"email exist")
        
        const _id = uuidv4()
        
        const passwordHashed = await bcrypt.hash(password, 10)
        const passRes = await this.db.createPassword(_id, passwordHashed)
        if(!passRes) return new ResponseDocument(false, "error al guardar la password")
        
        const res = await this.db.create({username, email, _id})
        if(!res) return new ResponseDocument(false, "error al crear el usuario, error de sevidor")
        
        return new ResponseDocument(true, "se registro existosamente")
    }
}
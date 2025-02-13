import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument, UserS } from "./UserDocument";
import { PasswordDocument, PasswordS } from "./PasswordDocument";
import { UserRepository } from "src/models/user/domain/respository/UserRepository";
import { Password } from "src/models/user/domain/entity/password/Password";
import { User } from "src/models/user/domain/entity/user/User";

export class MongoUserRepository implements UserRepository {
    constructor(
        @InjectModel(UserS.name) private readonly userModel: Model<UserDocument>,
        @InjectModel(PasswordS.name) private readonly passwordModel: Model<PasswordDocument>
    ) {}
    
    async createPassword(_id: string, password: string): Promise<string>{
        const res = await new this.passwordModel({password, _id}).save()
        return res.password
    }
    
    async getPassword(_id:string): Promise<string | null>{
        const res = await this.passwordModel.findById(_id)
        return res? res.password:null
    }

    async changePassword(_id:string, password:string): Promise<string | null>{
        const res = await this.passwordModel.findByIdAndUpdate(_id, {password})
        return res? res.password: null
    }
    
    async create(user: { username: string, email: string, _id: string }): Promise<User | null> {
        const res = await new this.userModel({
            username: user.username,
            email: user.email,
            _id: user._id
        }).save();
        return res? this.transform(res): null
    }

    async findAll(): Promise<User[] | null> {
        const res = await this.userModel.find().exec();
        return res? res.map((user) => this.transform(user)): null
    }

    async findById(_id: string): Promise<User | null> {
        const res = await this.userModel.findById(_id).exec();
        return res? this.transform(res): null
    }

    async findByEmail(email: string): Promise<User | null> {
        const res = await this.userModel.findOne({ email }).exec();
        return res? this.transform(res) : null
    }

    async update(user: User): Promise<User | null> {
        const res = await this.userModel.findByIdAndUpdate(user._id, user, { new: true }).exec();
        return res? this.transform(res) : null
    }

    async delete(_id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(_id);
    }

    transform(u: UserS): User{
        return new User(
            u._id, 
            u.email,
            u.status,
            u.addressData,
            u.favoritesData,
            u.shoppingData,
            u.createdAt,
            u.updatedAt
        )
        
    }
}

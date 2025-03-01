import { Password } from "../entity/password/Password";
import { User } from "../entity/user/User";

export interface UserRepository{
    createPassword(_id: string, password: string): Promise<Password | null> 
    getPassword(_id:string): Promise<Password | null>
    changePassword(_id:string, password:string): Promise<Password | null>
    
    create(user: {username:string,email:string, _id:string}): Promise<User | null>;
    findAll(): Promise<User[] | null>;
    findById(_id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<User | null>;
    delete(_id: string): Promise<User | null>
}
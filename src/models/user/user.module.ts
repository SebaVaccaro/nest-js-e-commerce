import { Module } from "@nestjs/common";
import { UserService } from "./infrastructure/service/user.service";
import { UserController } from "./infrastructure/controller/user.controller";
import { RegisterUserUseCase } from "./domain/usecases/RegisterUserUseCase";
import { LoginUserUseCase } from "./domain/usecases/LoginUserUseCase";
import { MongooseModule } from "@nestjs/mongoose";
import { UserS, UserSchema } from "./infrastructure/persistence/mongoDb/UserDocument";
import { MongoUserRepository } from "./infrastructure/persistence/mongoDb/MongoUserRespository";
import { PasswordS, PasswordSchema } from "./infrastructure/persistence/mongoDb/PasswordDocument";


@Module({
  imports:[
    MongooseModule.forFeature([{name: UserS.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: PasswordS.name, schema: PasswordSchema}])
  ],
  providers: [
    {
      provide: "UserRepository",
      useClass: MongoUserRepository,
    },
    RegisterUserUseCase,
    LoginUserUseCase,
    UserService,
  ],
  controllers: [UserController]
})
export class UserModule { }
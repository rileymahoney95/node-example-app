import { Container } from "inversify";
import { TYPES } from "./types";

// Interfaces
import { IUserService, IWalletService } from "@/interfaces/services";
import { ILogger } from "@/services/logger.service";

// Implementations
import { UserService } from "@/services/user.service";
import { WalletService } from "@/services/wallet.service";
import { UserRepository } from "@/repositories/user.repository";
import { WalletRepository } from "@/repositories/wallet.repository";
import { LoggerService } from "@/services/logger.service";
import { UserController } from "@/controllers/user.controller";
import { WalletController } from "@/controllers/wallet.controller";
import { AppDataSource } from "@/config/db/datasource";

const container = new Container();

// Infrastructure
container.bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
container.bind(TYPES.DataSource).toConstantValue(AppDataSource);

// Repositories
container.bind(TYPES.UserRepository).to(UserRepository);
container.bind(TYPES.WalletRepository).to(WalletRepository);

// Services
container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IWalletService>(TYPES.WalletService).to(WalletService);

// Controllers
container.bind(TYPES.UserController).to(UserController);
container.bind(TYPES.WalletController).to(WalletController);

export { container };

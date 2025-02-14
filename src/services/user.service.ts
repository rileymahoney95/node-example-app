import { injectable, inject } from "inversify";
import { UserEntity } from "@/models/user.entity";
import { UserCreate, UserUpdate } from "@/schemas/user.schema";
import { BadRequestError, NotFoundError } from "@/constants/errors/app-errors";
import { TYPES } from "@/config/container/types";
import { IUserService } from "@/interfaces/services";
import { ILogger } from "@/services/logger.service";
import { UserRepository } from "@/repositories/user.repository";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.Logger) private logger: ILogger
  ) {}

  async create(userData: UserCreate): Promise<UserEntity> {
    const existingUser = await this.userRepository.findUserByExternalIds(
      userData.externalIds
    );

    if (existingUser) {
      throw new BadRequestError(
        `User with external id ${userData.externalIds} already exists`
      );
    }

    this.logger.info(`Creating new user with external ids: ${userData.externalIds}`);
    return this.userRepository.createUser(userData);
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async update(id: string, userData: UserUpdate): Promise<UserEntity> {
    return this.userRepository.updateUser(id, userData);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}

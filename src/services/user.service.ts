import { Repository } from "typeorm";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { AppDataSource } from "../config/db/datasource";
import logger from "../utils/logger";
import { UserCreate, UserLogin } from "../schemas/user.schema";
import { AppError } from "../utils/AppError";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async create(userData: UserCreate): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new AppError(400, "Email already in use");
    }

    const user = new User(userData);
    user.password = await hash(user.password, 10);
    return this.userRepository.save(user);
  }

  async authenticate({
    email,
    password,
  }: UserLogin): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError(401, "Invalid credentials");
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      throw new AppError(401, "Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "your-secret-key",
      {
        expiresIn: "24h",
      }
    );

    return { user, token };
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

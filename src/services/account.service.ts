import { injectable, inject } from "inversify";
import { TYPES } from "@/config/container/types";
import { IAccountService } from "@/interfaces/services";
import { ILogger } from "@/services/logger.service";
import { AccountRepository } from "@/repositories/account.repository";
import { AccountCreate, AccountUpdate } from "@/schemas/account.schema";
import { AccountEntity } from "@/models/account.entity";
import { NotFoundError } from "@/constants/errors/app-errors";

@injectable()
export class AccountService implements IAccountService {
  constructor(
    @inject(TYPES.AccountRepository)
    private accountRepository: AccountRepository,
    @inject(TYPES.Logger) private logger: ILogger
  ) {}

  async create(accountData: AccountCreate): Promise<AccountEntity> {
    this.logger.info(`Creating new account for wallet`, accountData);
    return this.accountRepository.createAccount(accountData);
  }

  async findById(id: string): Promise<AccountEntity> {
    const account = await this.accountRepository.findOneBy({ id });
    if (!account) {
      throw new NotFoundError("Account not found");
    }
    return account;
  }

  async findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.find();
  }

  async update(id: string, accountData: AccountUpdate): Promise<AccountEntity> {
    this.logger.info(
      `Updating account ${id} with data: ${JSON.stringify(accountData)}`
    );
    const account = await this.findById(id);
    Object.assign(account, accountData);
    return this.accountRepository.save(account);
  }

  async delete(id: string): Promise<void> {
    const account = await this.findById(id);
    await this.accountRepository.delete(id);
  }
}

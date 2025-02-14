import { injectable, inject } from "inversify";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { AccountEntity } from "@/models/account.entity";
import { TYPES } from "@/config/container/types";

@injectable()
export class AccountRepository extends Repository<AccountEntity> {
  constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
    super(AccountEntity, dataSource.createEntityManager());
  }

  async createAccount(
    account: DeepPartial<AccountEntity>
  ): Promise<AccountEntity> {
    return this.save(account);
  }

  async updateAccount(
    id: string,
    account: DeepPartial<AccountEntity>
  ): Promise<AccountEntity> {
    return this.save({ ...account, id });
  }
}

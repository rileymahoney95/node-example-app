import { injectable, inject } from "inversify";
import { DataSource, DeepPartial, Repository } from "typeorm";
import { WalletEntity } from "@/models/wallet.entity";
import { TYPES } from "@/config/container/types";

@injectable()
export class WalletRepository extends Repository<WalletEntity> {
  constructor(@inject(TYPES.DataSource) dataSource: DataSource) {
    super(WalletEntity, dataSource.createEntityManager());
  }

  async createWallet(wallet: DeepPartial<WalletEntity>): Promise<WalletEntity> {
    return this.save(wallet);
  }

  async updateWallet(
    id: string,
    wallet: DeepPartial<WalletEntity>
  ): Promise<WalletEntity> {
    return this.save({ ...wallet, id });
  }
}

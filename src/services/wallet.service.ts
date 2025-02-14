import { injectable, inject } from "inversify";
import { WalletEntity } from "@/models/wallet.entity";
import { WalletCreate, WalletUpdate } from "@/schemas/wallet.schema";
import { TYPES } from "@/config/container/types";
import { IWalletService } from "@/interfaces/services";
import { ILogger } from "@/services/logger.service";
import { WalletRepository } from "@/repositories/wallet.repository";
import { NotFoundError } from "@/constants/errors/app-errors";
import { AccountCreate } from "@/schemas/account.schema";
import { BalanceCreate } from "@/schemas/balance.schema";

@injectable()
export class WalletService implements IWalletService {
  constructor(
    @inject(TYPES.WalletRepository) private walletRepository: WalletRepository,
    @inject(TYPES.Logger) private logger: ILogger
  ) {}

  async create(walletData: WalletCreate): Promise<WalletEntity> {
    const walletId = crypto.randomUUID();
    
    const initialAccount: AccountCreate = {
      currency: walletData.initialAccountBalance.currency,
    };

    const initialBalance: BalanceCreate = {
      type: walletData.initialAccountBalance.type,
      amount: walletData.initialAccountBalance.amount,
    };


    return this.walletRepository.createWallet(walletData);
  }

  async findById(id: string): Promise<WalletEntity> {
    const wallet = await this.walletRepository.findOneBy({ id });
    if (!wallet) {
      throw new NotFoundError("Wallet not found");
    }
    return wallet;
  }

  async findAll(): Promise<WalletEntity[]> {
    return this.walletRepository.find();
  }

  async update(id: string, walletData: WalletUpdate): Promise<WalletEntity> {
    const wallet = await this.findById(id);
    Object.assign(wallet, walletData);
    return this.walletRepository.save(wallet);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.walletRepository.delete(id);
  }
}

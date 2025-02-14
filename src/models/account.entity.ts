import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { WalletEntity, BalanceEntity } from "./index";

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  CAD = "CAD",
  BTC = "BTC",
  LOYALTY = "LOYALTY",
}

@Entity("accounts")
@Unique(["walletId", "currency"])
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: Currency })
  currency: Currency;

  @Column("uuid")
  walletId: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.accounts)
  wallet: WalletEntity;

  @OneToMany(() => BalanceEntity, (balance) => balance.account)
  balances: BalanceEntity[];
}

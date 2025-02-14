import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity, AccountEntity, PaymentInstrumentEntity } from "./index";

export enum WalletStatus {
  ACTIVE = "ACTIVE",
  LOCKED = "LOCKED",
  CLOSED = "CLOSED",
}

@Entity("wallets")
export class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: WalletStatus })
  status: WalletStatus;

  @Column("uuid")
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.wallet)
  user: UserEntity;

  @OneToMany(() => AccountEntity, (account) => account.wallet)
  accounts: AccountEntity[];

  @OneToMany(() => PaymentInstrumentEntity, (instrument) => instrument.wallet)
  paymentInstruments: PaymentInstrumentEntity[];
}

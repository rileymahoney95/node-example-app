import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { WalletEntity } from "./wallet.entity";

export enum PaymentInstrumentType {
  CREDIT_CARD = "CREDIT_CARD",
  BANK_ACCOUNT = "BANK_ACCOUNT",
  CRYPTO_WALLET = "CRYPTO_WALLET",
  LOYALTY_PROGRAM = "LOYALTY_PROGRAM",
}

export enum PaymentInstrumentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXPIRED = "EXPIRED",
}

@Entity("payment_instruments")
@Unique(["walletId", "type"])
export class PaymentInstrumentEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: PaymentInstrumentType })
  type: PaymentInstrumentType;

  @Column("enum", { enum: PaymentInstrumentStatus })
  status: PaymentInstrumentStatus;

  @Column({ type: "text", nullable: true })
  externalToken: string | null;

  // Other metadata (e.g. last4 digits for a credit card, or a loyalty ID)
  @Column({ type: "text", nullable: true })
  displayLabel: string | null;

  @Column("uuid")
  walletId: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.paymentInstruments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "walletId" })
  wallet: WalletEntity;
}

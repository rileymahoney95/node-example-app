import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { WalletEntity } from "./wallet.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "jsonb" })
  externalIds: Record<string, string[]>;

  @OneToOne(() => WalletEntity, (wallet) => wallet.user)
  wallet: WalletEntity;
}

import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { BaseEntity } from "./base.entity";
import { AccountEntity, BalanceRuleEntity } from "./index";

export enum BalanceType {
  MAIN = "MAIN",
  BONUS = "BONUS",
  LOCKED = "LOCKED",
}

@Entity("balances")
@Unique(["accountId", "type"])
export class BalanceEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: BalanceType })
  type: BalanceType;

  @Column("decimal", { precision: 18, scale: 8, default: 0 })
  amount: number;

  @Column("uuid")
  accountId: string;

  @ManyToOne(() => AccountEntity, (account) => account.balances)
  account: AccountEntity;

  @ManyToMany(() => BalanceRuleEntity, (rule) => rule.balances)
  @JoinTable({
    name: "balance_rules_join",
    joinColumns: [{ name: "balanceId" }],    
    inverseJoinColumns: [{ name: "ruleId" }],
  })
  balanceRules: BalanceRuleEntity[];
}

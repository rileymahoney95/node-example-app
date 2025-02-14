import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { BalanceEntity } from "./balance.entity";

export enum BalanceRuleType {
  NO_WITHDRAWAL = "NO_WITHDRAWAL",
  SPEND_ONLY_ON_SUBSCRIPTION = "SPEND_ONLY_ON_SUBSCRIPTION",
}

@Entity("balance_rules")
export class BalanceRuleEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: BalanceRuleType })
  ruleType: BalanceRuleType;

  @Column("text")
  description: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @Column("uuid")
  balanceId: string;

  @ManyToMany(() => BalanceEntity, (balance) => balance.balanceRules)
  balances: BalanceEntity[];
}

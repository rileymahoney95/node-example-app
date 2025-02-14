import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1739559156585 implements MigrationInterface {
    name = 'Migration1739559156585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "externalIds" jsonb NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."accounts_currency_enum" AS ENUM('USD', 'EUR', 'GBP', 'CAD', 'BTC', 'LOYALTY')`);
        await queryRunner.query(`CREATE TABLE "accounts" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currency" "public"."accounts_currency_enum" NOT NULL, "walletId" uuid NOT NULL, CONSTRAINT "UQ_ab60a8be17db70fd0109e8771b7" UNIQUE ("walletId", "currency"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."balances_type_enum" AS ENUM('MAIN', 'BONUS', 'LOCKED')`);
        await queryRunner.query(`CREATE TABLE "balances" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."balances_type_enum" NOT NULL, "amount" numeric(18,8) NOT NULL DEFAULT '0', "accountId" uuid NOT NULL, CONSTRAINT "UQ_ffd06dda1166b4cd245756f46b6" UNIQUE ("accountId", "type"), CONSTRAINT "PK_74904758e813e401abc3d4261c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."balance_rules_ruletype_enum" AS ENUM('NO_WITHDRAWAL', 'SPEND_ONLY_ON_SUBSCRIPTION')`);
        await queryRunner.query(`CREATE TABLE "balance_rules" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ruleType" "public"."balance_rules_ruletype_enum" NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "balanceId" uuid NOT NULL, CONSTRAINT "PK_9e39419e33379e2baf101fe7a71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_instruments_type_enum" AS ENUM('CREDIT_CARD', 'BANK_ACCOUNT', 'CRYPTO_WALLET', 'LOYALTY_PROGRAM')`);
        await queryRunner.query(`CREATE TYPE "public"."payment_instruments_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'EXPIRED')`);
        await queryRunner.query(`CREATE TABLE "payment_instruments" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."payment_instruments_type_enum" NOT NULL, "status" "public"."payment_instruments_status_enum" NOT NULL, "externalToken" text, "displayLabel" text, "walletId" uuid NOT NULL, CONSTRAINT "UQ_ff2e3f64fe79a89be72c9c1161e" UNIQUE ("walletId", "type"), CONSTRAINT "PK_bbac1788fea3534e431dcd4ab32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."wallets_status_enum" AS ENUM('ACTIVE', 'LOCKED', 'CLOSED')`);
        await queryRunner.query(`CREATE TABLE "wallets" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."wallets_status_enum" NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_8402e5df5a30a229380e83e4f7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "balance_rules_join" ("balanceId" uuid NOT NULL, "ruleId" uuid NOT NULL, CONSTRAINT "PK_c01a8e5c92b2711d83f0abf7a31" PRIMARY KEY ("balanceId", "ruleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_adde79449b67984a8f49189a07" ON "balance_rules_join" ("balanceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_121f3734a71457beb0dd84fb36" ON "balance_rules_join" ("ruleId") `);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_8af1cf256794940408854f4d545" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balances" ADD CONSTRAINT "FK_badf9a6b99874218d10974e1735" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_instruments" ADD CONSTRAINT "FK_2c7a9fe5cb407aeccaa0e4907c6" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "balance_rules_join" ADD CONSTRAINT "FK_adde79449b67984a8f49189a070" FOREIGN KEY ("balanceId") REFERENCES "balances"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "balance_rules_join" ADD CONSTRAINT "FK_121f3734a71457beb0dd84fb367" FOREIGN KEY ("ruleId") REFERENCES "balance_rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "balance_rules_join" DROP CONSTRAINT "FK_121f3734a71457beb0dd84fb367"`);
        await queryRunner.query(`ALTER TABLE "balance_rules_join" DROP CONSTRAINT "FK_adde79449b67984a8f49189a070"`);
        await queryRunner.query(`ALTER TABLE "payment_instruments" DROP CONSTRAINT "FK_2c7a9fe5cb407aeccaa0e4907c6"`);
        await queryRunner.query(`ALTER TABLE "balances" DROP CONSTRAINT "FK_badf9a6b99874218d10974e1735"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_8af1cf256794940408854f4d545"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_121f3734a71457beb0dd84fb36"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adde79449b67984a8f49189a07"`);
        await queryRunner.query(`DROP TABLE "balance_rules_join"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TYPE "public"."wallets_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment_instruments"`);
        await queryRunner.query(`DROP TYPE "public"."payment_instruments_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_instruments_type_enum"`);
        await queryRunner.query(`DROP TABLE "balance_rules"`);
        await queryRunner.query(`DROP TYPE "public"."balance_rules_ruletype_enum"`);
        await queryRunner.query(`DROP TABLE "balances"`);
        await queryRunner.query(`DROP TYPE "public"."balances_type_enum"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TYPE "public"."accounts_currency_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

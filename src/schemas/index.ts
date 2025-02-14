import {
  walletCreateSchema,
  walletUpdateSchema,
  WalletCreate,
  WalletUpdate,
} from "./wallet.schema";
import {
  userCreateSchema,
  userUpdateSchema,
  UserCreate,
  UserUpdate,
} from "./user.schema";
import {
  paymentInstrumentCreateSchema,
  paymentInstrumentUpdateSchema,
  PaymentInstrumentCreate,
  PaymentInstrumentUpdate,
} from "./payment-instrument.schema";
import {
  accountCreateSchema,
  accountUpdateSchema,
  AccountCreate,
  AccountUpdate,
} from "./account.schema";
import {
  balanceCreateSchema,
  balanceUpdateSchema,
  BalanceCreate,
  BalanceUpdate,
} from "./balance.schema";
import {
  balanceRuleCreateSchema,
  balanceRuleUpdateSchema,
  BalanceRuleCreate,
  BalanceRuleUpdate,
} from "./balance-rule.schema";

export const schemas = {
  // Wallet
  walletCreateSchema,
  walletUpdateSchema,
  // User
  userCreateSchema,
  userUpdateSchema,
  // Payment Instrument
  paymentInstrumentCreateSchema,
  paymentInstrumentUpdateSchema,
  // Account
  accountCreateSchema,
  accountUpdateSchema,
  // Balance
  balanceCreateSchema,
  balanceUpdateSchema,
  // Balance Rule
  balanceRuleCreateSchema,
  balanceRuleUpdateSchema,
};

export type {
  // Wallet
  WalletCreate,
  WalletUpdate,
  // User
  UserCreate,
  UserUpdate,
  // Payment Instrument
  PaymentInstrumentCreate,
  PaymentInstrumentUpdate,
  // Account
  AccountCreate,
  AccountUpdate,
  // Balance
  BalanceCreate,
  BalanceUpdate,
  // Balance Rule
  BalanceRuleCreate,
  BalanceRuleUpdate,
};

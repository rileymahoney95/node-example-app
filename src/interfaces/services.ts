import {
  UserEntity,
  WalletEntity,
  AccountEntity,
  PaymentInstrumentEntity,
} from "@/models";
import {
  UserCreate,
  UserUpdate,
  WalletCreate,
  WalletUpdate,
  AccountCreate,
  AccountUpdate,
  PaymentInstrumentCreate,
  PaymentInstrumentUpdate,
} from "@/schemas";

export interface IUserService {
  create(userData: UserCreate): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  update(id: string, userData: UserUpdate): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}

export interface IWalletService {
  create(walletData: WalletCreate): Promise<WalletEntity>;
  findById(id: string): Promise<WalletEntity>;
  findAll(): Promise<WalletEntity[]>;
  update(id: string, walletData: WalletUpdate): Promise<WalletEntity>;
  delete(id: string): Promise<void>;
}

export interface IAccountService {
  create(accountData: AccountCreate): Promise<AccountEntity>;
  findById(id: string): Promise<AccountEntity>;
  findAll(): Promise<AccountEntity[]>;
  update(id: string, accountData: AccountUpdate): Promise<AccountEntity>;
  delete(id: string): Promise<void>;
}

export interface IPaymentInstrumentService {
  create(
    paymentInstrumentData: PaymentInstrumentCreate
  ): Promise<PaymentInstrumentEntity>;
  findById(id: string): Promise<PaymentInstrumentEntity>;
  findAll(): Promise<PaymentInstrumentEntity[]>;
  update(
    id: string,
    paymentInstrumentData: PaymentInstrumentUpdate
  ): Promise<PaymentInstrumentEntity>;
  delete(id: string): Promise<void>;
  depositFromInstrument(instrumentId: string, amount: number): Promise<void>;
  withdrawToInstrument(instrumentId: string, amount: number): Promise<void>;
}

export const TYPES = {
  // Infrastructure
  Logger: Symbol.for("Logger"),
  DataSource: Symbol.for("DataSource"),

  // Repositories
  UserRepository: Symbol.for("UserRepository"),
  WalletRepository: Symbol.for("WalletRepository"),
  AccountRepository: Symbol.for("AccountRepository"),

  // Services
  UserService: Symbol.for("UserService"),
  WalletService: Symbol.for("WalletService"),
  AccountService: Symbol.for("AccountService"),
  PaymentInstrumentService: Symbol.for("PaymentInstrumentService"),
  BalanceService: Symbol.for("BalanceService"),
  BalanceRuleService: Symbol.for("BalanceRuleService"),

  // Controllers
  UserController: Symbol.for("UserController"),
  WalletController: Symbol.for("WalletController"),
  AccountController: Symbol.for("AccountController"),
  PaymentInstrumentController: Symbol.for("PaymentInstrumentController"),

} as const;

import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import { IWalletService } from "@/interfaces/services";
import { TYPES } from "@/config/container/types";
import { asyncHandler } from "@/utils/async-handler";
import { ILogger } from "@/services/logger.service";

@injectable()
export class WalletController {
  constructor(
    @inject(TYPES.WalletService) private walletService: IWalletService,
    @inject(TYPES.Logger) private logger: ILogger
  ) {}

  create = asyncHandler(async (req: Request, res: Response) => {
    const wallet = await this.walletService.create(req.body);
    this.logger.info(`Created wallet ${wallet.id} for user ${wallet.userId}`);
    res.status(201).json(wallet);
  });

  findById = asyncHandler(async (req: Request, res: Response) => {
    const wallet = await this.walletService.findById(req.params.id);
    res.json(wallet);
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const wallets = await this.walletService.findAll();
    res.json(wallets);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const wallet = await this.walletService.update(req.params.id, req.body);
    this.logger.info(`Updated wallet ${wallet.id} for user ${wallet.userId}`);
    res.json(wallet);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await this.walletService.delete(req.params.id);
    this.logger.info(`Deleted wallet ${req.params.id}`);
    res.status(204).send();
  });
}

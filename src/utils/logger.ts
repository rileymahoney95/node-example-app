import { container } from "@/config/container/container";
import { TYPES } from "@/config/container/types";
import { ILogger } from "@/services/logger.service";

// Instead of getting logger immediately, create a function that gets it lazily
const getLogger = (): ILogger => {
  return container.get<ILogger>(TYPES.Logger);
};

// Export a proxy that will get the logger instance when needed
export default {
  info: (message: string, ...meta: any[]) => getLogger().info(message, ...meta),
  error: (message: string | Error, ...meta: any[]) =>
    getLogger().error(message, ...meta),
  warn: (message: string, ...meta: any[]) => getLogger().warn(message, ...meta),
  debug: (message: string, ...meta: any[]) =>
    getLogger().debug(message, ...meta),
};

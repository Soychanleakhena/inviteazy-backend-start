export class Logger {
    static info(message: string, meta?: object) {
      console.log(`[INFO] ${new Date().toISOString()} ${message}`, this.cleanMeta(meta));
    }
  
    static warn(message: string, meta?: object) {
      console.warn(`[WARN] ${new Date().toISOString()} ${message}`, this.cleanMeta(meta));
    }
  
    static error(message: string, meta?: object) {
      console.error(`[ERROR] ${new Date().toISOString()} ${message}`, this.cleanMeta(meta));
    }
  
    private static cleanMeta(meta?: object) {
      if (!meta) return undefined;
        const clone = JSON.parse(JSON.stringify(meta));
      if (clone.password) clone.password = "[REDACTED]";
      if (clone.token) clone.token = "[REDACTED]";
      if (clone.data?.password) clone.data.password = "[REDACTED]";
      if (clone.data?.token) clone.data.token = "[REDACTED]";
      return clone;
    }
  }
  
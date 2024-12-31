type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

interface ErrorLog {
  timestamp: number;
  message: string;
  severity: ErrorSeverity;
  context?: Record<string, unknown>;
}

class ErrorLogger {
  private static instance: ErrorLogger;
  private logs: ErrorLog[] = [];
  private readonly MAX_LOGS = 100;

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  log(message: string, severity: ErrorSeverity, context?: Record<string, unknown>) {
    const errorLog: ErrorLog = {
      timestamp: Date.now(),
      message,
      severity,
      context
    };

    this.logs.unshift(errorLog);
    
    // Maintain max logs limit
    if (this.logs.length > this.MAX_LOGS) {
      this.logs.pop();
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error(`[${severity.toUpperCase()}] ${message}`, context);
    }
  }

  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}
export class StorageRecovery {
  private static readonly BACKUP_PREFIX = 'backup_';
  private static readonly MAX_RETRIES = 3;
  private static readonly RETRY_DELAY = 1000; // 1 second

  static async saveWithRetry(key: string, data: unknown): Promise<boolean> {
    let retries = 0;
    
    while (retries < this.MAX_RETRIES) {
      try {
        // Create backup first
        const backupKey = `${this.BACKUP_PREFIX}${key}`;
        localStorage.setItem(backupKey, JSON.stringify(data));
        
        // Attempt main save
        localStorage.setItem(key, JSON.stringify(data));
        
        // If successful, clear backup
        localStorage.removeItem(backupKey);
        return true;
      } catch (error) {
        retries++;
        if (retries === this.MAX_RETRIES) {
          console.error('Storage save failed after max retries:', error);
          return false;
        }
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY));
      }
    }
    return false;
  }

  static async recoverData(key: string): Promise<unknown | null> {
    try {
      // Check for backup first
      const backupKey = `${this.BACKUP_PREFIX}${key}`;
      const backupData = localStorage.getItem(backupKey);
      
      if (backupData) {
        return JSON.parse(backupData);
      }
      
      // If no backup, try main storage
      const mainData = localStorage.getItem(key);
      return mainData ? JSON.parse(mainData) : null;
    } catch (error) {
      console.error('Data recovery failed:', error);
      return null;
    }
  }
}
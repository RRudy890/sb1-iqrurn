export class StorageManager {
  private static readonly STORAGE_VERSION = '1.0';
  private static readonly SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

  static async initialize(): Promise<void> {
    try {
      // Check storage version
      const version = localStorage.getItem('storage_version');
      if (version !== this.STORAGE_VERSION) {
        await this.migrate();
      }
      
      // Clean up old data
      await this.cleanup();
    } catch (error) {
      console.error('Storage initialization failed:', error);
    }
  }

  private static async migrate(): Promise<void> {
    try {
      // Perform any necessary data migrations
      localStorage.setItem('storage_version', this.STORAGE_VERSION);
    } catch (error) {
      console.error('Migration failed:', error);
    }
  }

  private static async cleanup(): Promise<void> {
    try {
      let totalSize = 0;
      const itemsToRemove = [];

      // Calculate total size and identify old items
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key) || '';
          totalSize += value.length * 2; // UTF-16 characters = 2 bytes

          // Check for expired items (older than 7 days)
          if (key.startsWith('temp_') && this.isExpired(key)) {
            itemsToRemove.push(key);
          }
        }
      }

      // Remove expired items
      itemsToRemove.forEach(key => localStorage.removeItem(key));

      // If still over limit, remove oldest items
      if (totalSize > this.SIZE_LIMIT) {
        await this.reduceStorage();
      }
    } catch (error) {
      console.error('Cleanup failed:', error);
    }
  }

  private static isExpired(key: string): boolean {
    try {
      const timestamp = parseInt(key.split('_')[1], 10);
      const age = Date.now() - timestamp;
      return age > 7 * 24 * 60 * 60 * 1000; // 7 days
    } catch {
      return true;
    }
  }

  private static async reduceStorage(): Promise<void> {
    // Implementation for reducing storage size
    // This would remove oldest non-essential data first
  }
}
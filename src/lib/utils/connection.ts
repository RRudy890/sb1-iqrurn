export const checkNetworkConnection = (): boolean => {
  return window.navigator.onLine;
};

export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/health');
    return response.ok;
  } catch (error) {
    console.error('Database connection check failed:', error);
    return false;
  }
};

export const validateStorageAccess = async (): Promise<boolean> => {
  try {
    const testKey = `test-${Date.now()}`;
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error('Storage access check failed:', error);
    return false;
  }
};
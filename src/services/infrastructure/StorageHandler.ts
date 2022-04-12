
class StorageHandler {
    setJSONItem<T>(key: string, value: T): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    } 
    getJSONItem<T>(key: string): T | null {
        const value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } 
        return null;
    }
    removeItem(key: string): void {
        window.localStorage.removeItem(key);
    }
};

export const storageHandler = new StorageHandler();
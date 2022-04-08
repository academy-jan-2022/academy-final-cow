
class StorageHandler {
    setJSONItem(key: string, value: Object): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    } 
    getJSONItem(key: string): Object | null {
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
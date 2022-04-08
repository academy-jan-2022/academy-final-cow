
class StorageHandler {
    setJSONItem(key: string, value: Object): void {
        console.log("set storage method");
        window.localStorage.setItem(key, JSON.stringify(value));
    } 
    getJSONItem(key: string): Object | null {
        const value = window.localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        } 
        return null;
    }
};

export const storageHandler = new StorageHandler();
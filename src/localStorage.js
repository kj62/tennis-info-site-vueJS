export default class LocalStorage {
    static getStore(storeKey) {
        let storedData = JSON.parse(localStorage.getItem(storeKey));
        return storedData;
    }
    static setStore(storeKey, dataToStore) {
        localStorage.setItem(storeKey, JSON.stringify(dataToStore));
    }
}
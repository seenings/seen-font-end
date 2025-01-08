const version = 2;
class IndexedDbService {
  /**
   * 打开存储空间
   */
  openStorage(
    storeName: string,
    databaseName: string
  ): Promise<IDBObjectStore> {
    return new Promise<IDBObjectStore>(
      (
        resolve: (value: IDBObjectStore) => void,
        reject: (reason: DOMException) => void
      ) => {
        let dbRequest: IDBOpenDBRequest;
        dbRequest = window.indexedDB.open(databaseName, version);
        dbRequest.onupgradeneeded = () => {
          let database: IDBDatabase = dbRequest.result;
          if (database.objectStoreNames.contains(storeName)) {
            database.deleteObjectStore(storeName);
            database.createObjectStore(storeName);
          } else {
            database.createObjectStore(storeName);
          }
        };
        dbRequest.onsuccess = () => {
          let database: IDBDatabase = dbRequest.result;
          //TODO 事务要放在多个存储里
          let transaction: IDBTransaction = database.transaction(
            storeName,
            "readwrite"
          );
          let store: IDBObjectStore = transaction.objectStore(storeName);
          resolve(store);
        };
        dbRequest.onerror = () => {
          if (dbRequest.error === null) {
            return reject(new DOMException());
          } else {
            console.error(dbRequest.error.message);
            return reject(dbRequest.error);
          }
        };
      }
    );
  }
}

export { IndexedDbService };

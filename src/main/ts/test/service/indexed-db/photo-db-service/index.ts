const photoDbName = "photo-test";
const version = 3;
class PhotoDbService {
  /**
   * 打开存储空间
   */
  openStorage(storeName: string): Promise<IDBObjectStore> {
    return new Promise<IDBObjectStore>(
      (
        resolve: (value: IDBObjectStore) => void,
        reject: (reason: DOMException) => void
      ) => {
        let photoDbRequest: IDBOpenDBRequest;
        photoDbRequest = window.indexedDB.open(photoDbName, version);
        photoDbRequest.onupgradeneeded = () => {
          let photoDatabase: IDBDatabase = photoDbRequest.result;
          photoDatabase.deleteObjectStore(storeName);
          photoDatabase.createObjectStore(storeName);
        };
        photoDbRequest.onsuccess = () => {
          let photoDatabase: IDBDatabase = photoDbRequest.result;
          //TODO 事务要放在多个存储里
          let photoTransaction: IDBTransaction = photoDatabase.transaction(
            storeName,
            "readwrite"
          );
          let photoStore: IDBObjectStore =
            photoTransaction.objectStore(storeName);
          resolve(photoStore);
        };
        photoDbRequest.onerror = () => {
          if (photoDbRequest.error === null) {
            return reject(new DOMException());
          } else {
            console.error(photoDbRequest.error.message);
            return reject(photoDbRequest.error);
          }
        };
      }
    );
  }
}
const photoDbService: PhotoDbService = new PhotoDbService();

export { photoDbService };

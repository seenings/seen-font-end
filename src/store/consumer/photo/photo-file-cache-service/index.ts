import { IndexedDbService } from "../../sys/indexed-db-service";

const photoDbName = "seen-photo";
const photoFileCacheName = "photo-file";

const photoFileCacheNameByCompress = "photo-file-compress";

class PhotoFileCacheService {
  /**
   * 根据ID读取数据,完整
   * @param id    id
   * @returns    blob数据
   */
  getByFull = (id: number): Promise<Blob> => {
    return this.get(id, photoFileCacheName);
  };

  /**
   * 根据ID存入数据,完整
   * @param id  ID
   * @param data    blob数据
   * @returns   是否存入成功
   */

  putByFull = (id: number, data: Blob): Promise<boolean> => {
    return this.put(id, data, photoFileCacheName);
  };
  /**
   * 根据ID读取数据,压缩
   * @param id    id
   * @returns    blob数据
   */
  getByCompress = (id: number): Promise<Blob> => {
    return this.get(id, photoFileCacheNameByCompress);
  };

  /**
   * 根据ID存入数据,压缩
   * @param id  ID
   * @param data    blob数据
   * @returns   是否存入成功
   */

  putByCompress = (id: number, data: Blob): Promise<boolean> => {
    return this.put(id, data, photoFileCacheNameByCompress);
  };
  /**
   * 根据ID读取数据
   * @param id    id
   * @returns    blob数据
   */
  get = (id: number, storeName: string): Promise<Blob> => {
    const indexedDbService: IndexedDbService = new IndexedDbService();
    const storageByPromise: Promise<IDBObjectStore> =
      indexedDbService.openStorage(storeName, photoDbName);
    return new Promise<Blob>(
      (
        resolve: (value: Blob) => void,
        reject: (reason: DOMException) => void
      ) => {
        storageByPromise
          .then((res) => {
            let req: IDBRequest<Blob> = res.get(id);
            req.onsuccess = () => {
              if (req.result) {
                resolve(req.result);
              } else {
                reject(new DOMException("缓存中无该照片"));
              }
            };
            req.onerror = () => {
              if (req.error === null) {
                return reject(new DOMException());
              } else {
                console.error(req.error.message);
                return reject(req.error);
              }
            };
          })
          .catch((e) => {
            return reject(e);
          });
      }
    );
  };
  /**
   * 根据ID存入数据
   * @param id  ID
   * @param data    blob数据
   * @returns   是否存入成功
   */
  put = (id: number, data: Blob, storeName: string): Promise<boolean> => {
    const indexedDbService: IndexedDbService = new IndexedDbService();
    const storageByPromise: Promise<IDBObjectStore> =
      indexedDbService.openStorage(storeName, photoDbName);
    return new Promise<boolean>(
      (
        resolve: (value: boolean) => void,
        reject: (reason: DOMException) => void
      ) => {
        storageByPromise
          .then((res) => {
            let req: IDBRequest<IDBValidKey> = res.put(data, id);
            req.onsuccess = () => {
              resolve(true);
            };
            req.onerror = () => {
              if (req.error === null) {
                return reject(new DOMException());
              } else {
                console.error(req.error.message);
                return reject(req.error);
              }
            };
          })
          .catch((e) => {
            return reject(e);
          });
      }
    );
  };
}

const photoFileCacheService: PhotoFileCacheService =
  new PhotoFileCacheService();

export { photoFileCacheService };

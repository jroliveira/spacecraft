class Store {
  private indexedDB: IDBFactory;
  private db: IDBDatabase;

  constructor() {
    if (!this.isIndexedDBSupported()) {
      console.error('indexedDB is not supported in your browser');
    }
  }

  async initialize(): Promise<void> {
    return new Promise<void>(resolve => {
      const req = this.indexedDB.open('spacecraft', 2);

      req.onsuccess = async (event: any) => {
        this.db = event.target.result;
        resolve();
      };

      req.onupgradeneeded = (event: any) => {
        const db = event.target.result;

        db.createObjectStore('projectiles', { keyPath: 'type', autoIncrement: false });
        db.createObjectStore('enemies', { keyPath: 'type', autoIncrement: false });
        db.createObjectStore('characters', { keyPath: 'type', autoIncrement: false });
        db.createObjectStore('objects', { keyPath: 'type', autoIncrement: false });
        db.createObjectStore('backgrounds', { keyPath: 'name', autoIncrement: false });
        db.createObjectStore('phases', { keyPath: 'name', autoIncrement: false });
        db.createObjectStore('scenarios', { keyPath: 'name', autoIncrement: false });
      };
    });
  }

  async get(table: string, value: string): Promise<any> {
    return new Promise<any>(resolve => {
      this.db
        .transaction([table], 'readonly')
        .objectStore(table)
        .get(value)
        .onsuccess = (event: any) => resolve(event.target.result);
    });
  }

  async clear(table: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.db
        .transaction([table], 'readwrite')
        .objectStore(table)
        .clear()
        .onsuccess = () => resolve();
    });
  }

  async add(table: string, value: any): Promise<void> {
    return new Promise<void>(resolve => {
      this.db
        .transaction([table], 'readwrite')
        .objectStore(table)
        .add(value)
        .onsuccess = () => resolve();
    });
  }

  private isIndexedDBSupported() {
    const global = self || window;

    if (!global['indexedDB']) {
      (<any>global).indexedDB = global['mozIndexedDB'] || global['webkitIndexedDB'] || global['msIndexedDB'];
    }
    if (!global['IDBTransaction']) {
      (<any>global)['IDBTransaction'] = global['webkitIDBTransaction'] || global['msIDBTransaction'];
    }
    if (!global['IDBKeyRange']) {
      (<any>global)['IDBKeyRange'] = global['webkitIDBKeyRange'] || global['msIDBKeyRange']
    }

    if (!global.indexedDB) {
      return false;
    }
    this.indexedDB = global.indexedDB;
    return true;
  }
}

export const store = new Store();

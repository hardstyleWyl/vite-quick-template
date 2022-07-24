import utilConfig from '@/config/utilConfig'

interface IStoreManager {
    getItem(key : string) : any

    setItem(key : string, item : any) : void

    removeItem(key : string) : void

    hasKey(key : string) : boolean

    clear() : void
}

abstract class StoreManager implements IStoreManager {
    private readonly store : Storage

    protected supported : boolean

    protected prefix : string

    protected constructor(store : Storage, prefix : string) {
        this.store = store
        this.prefix = prefix
        this.supported = !!this.store
    }

    public clear() : void {
        if (!this.supported) {
            return
        }
        this.store.clear()
    }

    public getItem(key : string) : any {
        if (!this.supported) {
            return null
        }
        const item = this.store.getItem(this.prefix + key)
        return item ? JSON.parse(item) : null
    }

    public removeItem(key : string) : void {
        if (!this.supported) {
            return
        }
        this.store.removeItem(this.prefix + key)
    }

    public setItem(key : string, item : any) : void {
        if (!this.supported) {
            return
        }
        this.store.setItem(this.prefix + key, JSON.stringify(item))
    }

    public hasKey(key : string) : boolean {
        if (!this.supported) {
            return false
        }
        return this.store.getItem(this.prefix + key) !== null
    }

    public setPrefix(prefix : string) {
        this.prefix = prefix
    }
}

class LocalStorageManager extends StoreManager {
    public constructor(prefix : string) {
        super(window.localStorage, prefix)
    }
}

class SessionStorageManager extends StoreManager {
    public constructor(prefix : string) {
        super(window.sessionStorage, prefix)
    }
}

export const localStorageMgr = new LocalStorageManager(
    utilConfig.LocalStorageManagerPrefix
)
export const sessionStorageMgr = new SessionStorageManager(
    utilConfig.SessionStorageManagerPrefix
)

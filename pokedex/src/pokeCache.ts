export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

export class PokeCache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number){
        this.#interval = interval;
        this.#startReap();
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }


    add<T>(key: string, entry: T) {
        this.#cache.set(key, { createdAt: Date.now(), val: entry });
    }

    get<T>(key: string): CacheEntry<T> | undefined {
        return this.#cache.get(key)?.val;
    }

    #reap() {
        for (let key of this.#cache) {
            if (key[1].createdAt < Date.now() - this.#interval) {
                this.#cache.delete(key[0]);
            }
        }
    }

    #startReap() {
        if (this.#reapIntervalId) return;
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }
}
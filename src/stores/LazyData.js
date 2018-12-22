export const STATUSES = {
    NOT_LOADED: 0,
    LOADING: 1,
    LOADED: 2
};

export default class LazyData {

    constructor(status, payload) {
        this.status = status;
        this.payload = payload;
    }

    isLoaded() {
        return this.status === STATUSES.LOADED;
    }

    isLoading() {
        return this.status === STATUSES.LOADING;
    }

    isNotLoaded() {
        return this.status === STATUSES.NOT_LOADED;
    }

    getPayload() {
        return this.payload;
    }

    static notLoaded(content) {
        return new LazyData(STATUSES.NOT_LOADED, content !== undefined ? content : []);
    }

    static loading(content) {
        return new LazyData(STATUSES.LOADING, content !== undefined ? content : []);
    }

    static loaded(payload) {
        return new LazyData(STATUSES.LOADED, payload);
    }
}
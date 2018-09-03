export default class BaseEntity {
    constructor(uuid, pool) {
        this._uuid = uuid;
        this._pool = pool;
    }

    get uuid() {
        return this._uuid;
    }

    getEntity(uuid) {
        return this._pool[uuid] || null;
    }

    getEntities(uuids) {
        return uuids.map(uuid => this._pool[uuid]);
    }

    toDto(){
        return {
            uuid: this._uuid
        }
    }
}
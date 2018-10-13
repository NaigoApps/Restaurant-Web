export default class BaseEntity {
    constructor(uuid, pool) {
        this._uuid = uuid;
        this._pool = pool;
    }

    get uuid() {
        return this._uuid;
    }

    getEntity(uuid) {
        if(this._pool) {
            return this._pool[uuid];
        }
        return null;
    }

    getEntities(uuids) {
        return uuids.map(uuid => this._pool[uuid]);
    }

    toDto(){
        return {
            uuid: this._uuid
        }
    }

    static equals(e1, e2){
        if(!e1 && !e2){
            return true;
        }
        if(!e1 && e2 || e1 && !e2){
            return false;
        }
        return e1.equals(e2);
    }

    equals(entity){
        return this._uuid === entity._uuid;
    }
}
import LazyData, {STATUSES} from "../LazyData";
import RootFeatureStore from "../RootFeatureStore";

const {OrderedMap} = require('immutable');

export default class AbstractEntityStore extends RootFeatureStore {

    constructor(event) {
        super(event);
        this.status = STATUSES.NOT_LOADED;
        this.data = OrderedMap();
    }


    clearData() {
        this.data = OrderedMap();
        this.status = STATUSES.NOT_LOADED;
    }

    setData(data) {
        this.data = OrderedMap(data
            .sort((d1, d2) => this.comparator(d1, d2))
            .map(d => [d.get('uuid'), d]));
        this.status = STATUSES.LOADED;
    }

    comparator(d1, d2) {
        return d1.get('uuid').localeCompare(d2.get('uuid'));
    }

    getData() {
        if (this.isLoaded()) {
            return LazyData.loaded(this.data.toList());
        } else if (this.isLoading()) {
            return LazyData.loading();
        } else {
            return LazyData.notLoaded();
        }
    }

    getSingleData() {
        if (this.isLoaded()) {
            if (this.data.size === 1) {
                return LazyData.loaded(this.data.toList().get(0));
            }
            return LazyData.loaded(null);
        } else if (this.isLoading()) {
            return LazyData.loading(null);
        } else {
            return LazyData.notLoaded(null);
        }
    }

    createData(data) {
        if (!this.data.has(data.get('uuid'))) {
            this.data = this.data.set(data.get('uuid'), data);
        } else {
            console.warn("Trying to create existent data " + data.get('uuid'));
        }
    }

    updateData(data) {
        if (this.data.has(data.get('uuid'))) {
            this.data = this.data.set(data.get('uuid'), data);
        } else {
            console.warn("Trying to update non existent data " + data.get('uuid'));
        }
    }

    deleteData(uuid) {
        if (this.data.has(uuid)) {
            this.data = this.data.delete(uuid);
        } else {
            console.warn("Trying to delete non existent data " + uuid);
        }
    }

    setStatus(status) {
        this.status = status;
    }

    isLoaded() {
        return this.status === STATUSES.LOADED;
    }

    isNotLoaded() {
        return this.status === STATUSES.NOT_LOADED;
    }

    isLoading() {
        return this.status === STATUSES.LOADING;
    }

    static areLoaded(abstractStores) {
        let result = true;
        abstractStores.forEach(store => {
            result &= store.isLoaded();
        });
        return result;
    }
}

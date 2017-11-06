import LazyData, {STATUSES} from "./LazyData";
import dispatcher from "../dispatcher/SimpleDispatcher";
import AbstractStore from "./AbstractStore";

export default class AbstractEntityStore extends AbstractStore{
    constructor(event){
        super(event);
        this.status = STATUSES.NOT_LOADED;
        this.data = new Map();
    }

    setData(data) {
        this.data.clear();
        data.forEach(d => {
            this.data.set(d.uuid, d);
        });
    }

    setSimpleData(data){
        this.data.clear();
        data.forEach((d, i) => {
            this.data.set(i, d);
        });
    }

    getData(){
        return Array.from(this.data.values());
    }

    getSingleLazyData(){
        if (this.isLoaded()) {
            let result = Array.from(this.data.values());
            if(result.length === 1) {
                return LazyData.loaded(result[0]);
            }else{
                return LazyData.loaded([]);
            }
        } else if (this.isLoading()) {
            return LazyData.loading();
        } else {
            return LazyData.notLoaded();
        }
    }

    getLazyData(){
        if (this.isLoaded()) {
            let result = Array.from(this.data.values());
            return LazyData.loaded(result);
        } else if (this.isLoading()) {
            return LazyData.loading();
        } else {
            return LazyData.notLoaded();
        }
    }

    createData(data) {
        if(!this.data.has(data.uuid)) {
            this.data.set(data.uuid, data);
        }else{
            console.warn("Trying to create existent data " + data.uuid);
        }
    }

    retrieveData(uuid){
        return this.data.get(uuid);
    }

    updateData(data) {
        if(this.data.has(data.uuid)){
            this.data.set(data.uuid, data);
        }else{
            console.warn("Trying to update non existent data " + data.uuid);
        }
    }

    deleteData(uuid){
        if(this.data.has(uuid)){
            this.data.delete(uuid);
        }else{
            console.warn("Trying to delete non existent data " + uuid);
        }
    }

    setStatus(status){
        this.status = status;
    }

    isLoaded(){
        return this.status === STATUSES.LOADED;
    }

    isNotLoaded(){
        return this.status === STATUSES.NOT_LOADED;
    }

    isLoading(){
        return this.status === STATUSES.LOADING;
    }

}

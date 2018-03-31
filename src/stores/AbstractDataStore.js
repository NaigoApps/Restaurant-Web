import LazyData, {STATUSES} from "./LazyData";
import AbstractStore from "./RootFeatureStore";

export default class AbstractDataStore extends AbstractStore{
    constructor(event){
        super(event);
        this.status = STATUSES.NOT_LOADED;
        this.data = [];
    }

    clearData(){
        this.data = [];
        this.status = STATUSES.NOT_LOADED;
    }

    setData(data){
        this.data = data.slice(0);
        this.status = STATUSES.LOADED;
    }

    getSingleData(){
        if (this.isLoaded()) {
            let result = this.data.slice(0);
            if(result.length === 1) {
                return LazyData.loaded(result[0]);
            }else{
                return LazyData.loaded(null);
            }
        } else if (this.isLoading()) {
            return LazyData.loading(null);
        } else {
            return LazyData.notLoaded(null);
        }
    }

    getData(){
        if (this.isLoaded()) {
            return LazyData.loaded(this.data.slice(0));
        } else if (this.isLoading()) {
            return LazyData.loading();
        } else {
            return LazyData.notLoaded();
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

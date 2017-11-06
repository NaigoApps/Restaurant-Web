import {
    ACT_BEGIN_CREATE_DINING_TABLE,
    ACT_CREATE_DINING_TABLE,
    ACT_SELECT_DINING_TABLE,
    ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES,
    ACT_UPDATE_DINING_TABLE_CREATOR_TABLE,
    ACT_UPDATE_DINING_TABLE_CREATOR_WAITER
} from "../actions/ActionTypes";
import AbstractStore from "./AbstractStore";

export const EVT_DINING_TABLE_CREATOR_STORE_CHANGED = "EVT_DINING_TABLE_CREATOR_STORE_CHANGED";

class DiningTableCreatorStore extends AbstractStore {

    constructor() {
        super();
        this.clear();
    }

    reset(){
        this.creating = true;
        this.waiter = null;
        this.table = null;
        this.coverCharges = 2;
    }

    clear(){
        this.creating = false;
    }

    setWaiter(waiter){
        this.waiter = waiter;
    }

    setTable(table){
        this.table = table;
    }

    setCoverCharges(cc){
        this.coverCharges = cc;
    }

    getDiningTable(){
        if(this.creating) {
            return {
                waiter: this.waiter,
                table: this.table,
                coverCharges: this.coverCharges
            }
        }else{
            return null;
        }
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_BEGIN_CREATE_DINING_TABLE:
                this.reset();
                break;
            case ACT_UPDATE_DINING_TABLE_CREATOR_WAITER:
                this.setWaiter(action.body);
                break;
            case ACT_UPDATE_DINING_TABLE_CREATOR_TABLE:
                this.setTable(action.body);
                break;
            case ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES:
                this.setCoverCharges(action.body);
                break;
            case ACT_CREATE_DINING_TABLE:
                this.clear();
                break;
            case ACT_SELECT_DINING_TABLE:
                this.clear();
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_DINING_TABLE_CREATOR_STORE_CHANGED;
    }

}

const diningTableCreatorStore = new DiningTableCreatorStore();
export default diningTableCreatorStore;
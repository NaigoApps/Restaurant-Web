import AbstractStore from "../stores/AbstractStore";
import applicationStore from "../stores/ApplicationStore";
import dataStore from "../stores/DataStore";

const EVT_HOME_PAGE_CHANGED = "EVT_HOME_PAGE_CHANGED";

class HomePageStore extends AbstractStore {
    constructor(){
        super("homePage", EVT_HOME_PAGE_CHANGED, applicationStore, dataStore);
    }

    buildState(){
        return {}
    }
}

const homePageStore = new HomePageStore();
export default homePageStore;
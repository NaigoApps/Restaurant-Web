import AbstractStore from "./AbstractStore";

export const EVT_APPLICATION_STORE_CHANGED = "EVT_APPLICATION_STORE_CHANGED";

const PAGES = {
    WAITERS_MANAGEMENT: 0,
    MENU_MANAGEMENT: 1,
};

class ApplicationStore extends AbstractStore {

    constructor() {
        super();
        this.currentPage = null;
    }

    setCurrentPage(page){
        this.currentPage = page;
    }

    getCurrentPage(){
        return this.currentPage;
    }

    handleCompletedAction(action) {
        switch (action.type) {
            case GOTO_WAITERS_MANAGEMENT:
                this.setCurrentPage(PAGES.WAITERS_MANAGEMENT);
                break;
            case GOTO_MENU_MANAGEMENT:
                this.setCurrentPage(PAGES.MENU_MANAGEMENT);
                break;
        }
    }

    getChangeEvent(){
        return EVT_APPLICATION_STORE_CHANGED;
    }

}

export default applicationStore = new ApplicationStore();
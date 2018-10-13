import {DataActions} from "../../actions/DataActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

class EveningPageActions {

    initEveningPage() {
        this.initializeEvening();

        DataActions.loadWaiters();
        DataActions.loadPhases();
        DataActions.loadAdditions();
        DataActions.loadCustomers();
        DataActions.loadRestaurantTables();
        DataActions.loadDishes();
        DataActions.loadCategories();

        SettingsPageActions.loadSettings();
    }

    initializeEvening() {
        DataActions.loadDiningTables();
        DataActions.loadOrdinations();
        DataActions.loadOrders();
        DataActions.loadBills();
    }
}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;
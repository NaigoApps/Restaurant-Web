import {DataActions} from "../../actions/DataActions";
import {ApplicationActions} from "../../actions/ApplicationActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

class CustomersPageActions {

    initCustomersPage(){
        DataActions.loadCustomers();
        SettingsPageActions.loadSettings();
    }

}

const customersPageActions = new CustomersPageActions();
export default customersPageActions;
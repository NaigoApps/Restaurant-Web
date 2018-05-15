import tablesActions from "../../generic/TablesActions";
import {ApplicationActions} from "../../actions/ApplicationActions";

class TablesPageActions {

    initTablesPage(){
        tablesActions.retrieveTables();
        ApplicationActions.loadSettings();
    }

}

const tablesPageActions = new TablesPageActions();
export default tablesPageActions;
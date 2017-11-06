import tablesActions from "../../generic/TablesActions";

class TablesPageActions {

    initTablesPage(){
        tablesActions.retrieveTables()
    }

}

const tablesPageActions = new TablesPageActions();
export default tablesPageActions;
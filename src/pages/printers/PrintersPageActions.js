import printersActions from "../../generic/PrintersActions";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {ACT_PRINTERS_PAGE_SELECT_PAGE} from "../../actions/ActionTypes";
import {ApplicationActions} from "../../actions/ApplicationActions";

class PrintersPageActions {

    initPrintersPage(){
        printersActions.retrievePrinterServices();
        printersActions.retrievePrinters();
        ApplicationActions.loadSettings();
    }

    onSelectPrinterPage(index){
        dispatcher.fireEnd(ACT_PRINTERS_PAGE_SELECT_PAGE, index);
    }
}

const printersPageActions = new PrintersPageActions();
export default printersPageActions;
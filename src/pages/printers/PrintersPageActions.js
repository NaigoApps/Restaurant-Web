import printersActions from "../../generic/PrintersActions";

class PrintersPageActions {

    initPrintersPage(){
        printersActions.retrievePrinterServices();
        printersActions.retrievePrinters();
    }

}

const printersPageActions = new PrintersPageActions();
export default printersPageActions;
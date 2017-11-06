import dispatcher from "../../../dispatcher/SimpleDispatcher";

export const ACT_GRAPH_WIZARD_MOVE_PAGE = "ACT_GRAPH_WIZARD_MOVE_PAGE";
export const ACT_RESET_GRAPH_WIZARD = "ACT_RESET_GRAPH_WIZARD";
export const ACT_GRAPH_WIZARD_SET_DATA = "ACT_GRAPH_WIZARD_SET_DATA";

class GraphWizardActions {
    movePage(page) {
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_MOVE_PAGE, page);
    }

    setWizardData(newData) {
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_SET_DATA, newData);
    }

    reset(pagesData, initialData) {
        dispatcher.fireEnd(ACT_RESET_GRAPH_WIZARD, {
            pagesData: pagesData,
            initialData: initialData
        });
    }
}

const graphWizardActions = new GraphWizardActions();
export default graphWizardActions;
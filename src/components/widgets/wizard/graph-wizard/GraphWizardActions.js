import dispatcher from "../../../../dispatcher/SimpleDispatcher";

export const ACT_GRAPH_WIZARD_MOVE_PAGE = "ACT_GRAPH_WIZARD_MOVE_PAGE";
export const ACT_RESET_GRAPH_WIZARD = "ACT_RESET_GRAPH_WIZARD";
export const ACT_GRAPH_WIZARD_CONFIRM = "ACT_GRAPH_WIZARD_CONFIRM";
export const ACT_GRAPH_WIZARD_ABORT = "ACT_GRAPH_WIZARD_ABORT";
export const ACT_GRAPH_WIZARD_SET_DATA = "ACT_GRAPH_WIZARD_SET_DATA";
export const ACT_GRAPH_WIZARD_OPEN = "ACT_GRAPH_WIZARD_OPEN";
export const ACT_GRAPH_WIZARD_CLOSE = "ACT_GRAPH_WIZARD_CLOSE";
export const ACT_GRAPH_WIZARD_UNLOCK = "ACT_GRAPH_WIZARD_UNLOCK";
export const ACT_GRAPH_WIZARD_LOCK = "ACT_GRAPH_WIZARD_LOCK";

class GraphWizardActions {
    movePage(uuid, page) {
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_MOVE_PAGE, {uuid: uuid, page: page});
    }

    setWizardData(uuid, pageData, page) {
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_SET_DATA, {
            uuid: uuid,
            page: page,
            data: pageData
        });
    }

    reset(uuid, initialData, initialPage) {
        dispatcher.fireEnd(ACT_RESET_GRAPH_WIZARD, {
            uuid: uuid,
            initialData: initialData,
            initialPage: initialPage
        });
    }

    confirm(uuid) {
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_CONFIRM, uuid);
    }

    abort(uuid) {
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_ABORT, uuid);
    }

    open(uuid) {
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_OPEN, uuid);
    }

    close(uuid) {
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_CLOSE, uuid);
    }

    lock(uuid){
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_LOCK, uuid);
    }

    unlock(uuid){
        dispatcher.fireEnd(ACT_GRAPH_WIZARD_UNLOCK, uuid);
    }
}

const graphWizardActions = new GraphWizardActions();
export default graphWizardActions;
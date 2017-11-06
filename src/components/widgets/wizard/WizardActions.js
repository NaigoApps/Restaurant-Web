import dispatcher from "../../../dispatcher/SimpleDispatcher";

export const ACT_WIZARD_NEXT_STEP = "ACT_WIZARD_NEXT_STEP";
export const ACT_WIZARD_PREVIOUS_STEP = "ACT_WIZARD_PREVIOUS_STEP";
export const ACT_RESET_WIZARD = "ACT_RESET_WIZARD";

class WizardActions{
    nextStep(data){
        dispatcher.fireEnd(ACT_WIZARD_NEXT_STEP, data);
    }

    previousStep(){
        dispatcher.fireEnd(ACT_WIZARD_PREVIOUS_STEP);
    }

    reset(pages){
        dispatcher.fireEnd(ACT_RESET_WIZARD, pages);
    }
}

const wizardActions = new WizardActions();

export default wizardActions;
import AbstractStore from "../../../stores/RootFeatureStore";

const {Map} = require('immutable');

const EVT_WIZARD_CHANGED = "EVT_WIZARD_CHANGED";

export default class WizardStore extends AbstractStore {

    constructor(event) {
        super(event || EVT_WIZARD_CHANGED);
        this.wizardData = null;
        this.currentPage = 0;
    }

    getState() {
        return {
            wizardData: this.wizardData,
            currentPage: this.currentPage
        };
    }

    setWizardData(data){
        this.wizardData = data;
    }

    backward(){
        if(this.currentPage > 0){
            this.currentPage -= 1
        }
    }

    forward(pages){
        if(this.currentPage < pages - 1){
            this.currentPage += 1;
        }
    }

    init(){
        this.wizardData = Map();
        this.currentPage = 0;
    }

    destroy(){
        this.wizardData = null;
        this.currentPage = 0;
    }
}
import AbstractStore from "../../../../stores/RootFeatureStore";

const {Map} = require('immutable');

const EVT_GRAPH_WIZARD_CHANGED = "EVT_GRAPH_WIZARD_CHANGED";

export default class GraphWizardStore extends AbstractStore {

    constructor(event) {
        super(event || EVT_GRAPH_WIZARD_CHANGED);
        this.wizardData = null;
        this.currentPage = null;
    }

    getState() {
        return {
            wizardData: this.wizardData,
            currentPage: this.currentPage
        };
    }

    setWizardData(data) {
        this.wizardData = data;
    }

    setPage(page) {
        this.currentPage = page;
    }

    init() {
        this.wizardData = Map();
        this.currentPage = null;
    }

    destroy() {
        this.wizardData = null;
        this.currentPage = null;
    }

}
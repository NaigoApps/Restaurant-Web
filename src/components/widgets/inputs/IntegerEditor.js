import React, {Component} from 'react';
import IntegerInputGraphWizardPage from "../wizard/graph/IntegerInputWizardPage";
import GraphWizard from "../wizard/GraphWizard";

export default class IntegerEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData){
        this.props.commitAction(parseInt(wData["int_page"]));
    }

    static isInteger(val) {
        return !isNaN(parseInt(val)) && parseInt(val).toString() === val;
    }

    render() {
        const descriptor = this.props.descriptor;
        const value = this.props.value;
        const placeholder = this.props.placeholder;

        return <GraphWizard
            isValid={(wData) => wData && IntegerEditor.isInteger(wData["int_page"])}
            hideReview={true}
            initialPage="int_page"
            label={descriptor.label}
            renderer={(wData) => wData ? wData["int_page"] : ""}
            commitAction={this.onWizardConfirm.bind(this)}>
            <IntegerInputGraphWizardPage
                identifier="int_page"
                placeholder={placeholder}
                initializer={value ? value.toString() : ""}
            />
        </GraphWizard>;
    }

}
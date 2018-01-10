import React, {Component} from 'react';
import FloatInputWizardPage from "../wizard/FloatInputWizardPage";
import GraphWizard from "../wizard/GraphWizard";

export default class FloatEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData){
        this.props.commitAction(parseFloat(wData["float_page"]));
    }

    render() {
        const label = this.props.label;
        const value = this.props.value;
        const placeholder = this.props.placeholder;

        return <GraphWizard
            isValid={(wData) => wData && FloatEditor.isFloat(wData["float_page"])}
            hideReview={true}
            initialPage="float_page"
            label={label}
            renderer={(wData) => wData["float_page"] ? wData["float_page"] + "€" : ""}
            commitAction={this.onWizardConfirm.bind(this)}>
            <FloatInputWizardPage
                identifier="float_page"
                initializer={value ? value.toString() : ""}
                name={label}
                placeholder={placeholder}
            />
        </GraphWizard>;
    }

    static isFloat(val) {
        return !isNaN(parseFloat(val));
    }

}
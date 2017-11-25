import React, {Component} from 'react';
import Wizard from "../wizard/Wizard";
import SelectWizardPage from "../wizard/SelectWizardPage";
import GraphWizardPage from "../wizard/graph/GraphWizardPage";
import GraphWizard from "../wizard/GraphWizard";

export default class SelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(data){
        this.props.commitAction(data["select_page"]);
    }

    render() {
        const descriptor = this.props.descriptor;
        const value = this.props.value;

        return (
            <GraphWizard
                isValid={data => !!data["select_page"]}
                hideReview={true}
                initialPage="select_page"
                label={descriptor.label}
                renderer={wData => wData["select_page"]}
                commitAction={this.onWizardConfirm.bind(this)}>
                <SelectWizardPage
                    identifier="select_page"
                    initializer={value}
                    name={this.props.descriptor.label}
                    options={descriptor.optionsProvider()}
                    optionRenderer={opt => opt}
                />
            </GraphWizard>
        );

    }

}
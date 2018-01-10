import React, {Component} from 'react';
import SelectWizardPage from "../wizard/SelectWizardPage";
import GraphWizard from "../wizard/GraphWizard";

export default class SelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(data){
        this.props.commitAction(data["select_page"]);
    }

    render() {
        const label = this.props.label;
        const options = this.props.options;
        const value = this.props.value;

        return (
            <GraphWizard
                isValid={data => !!data["select_page"]}
                hideReview={true}
                initialPage="select_page"
                label={label}
                renderer={wData => wData["select_page"]}
                commitAction={this.onWizardConfirm.bind(this)}>
                <SelectWizardPage
                    identifier="select_page"
                    initializer={value}
                    name={label}
                    options={options}
                    optionRenderer={opt => opt}
                />
            </GraphWizard>
        );

    }

}
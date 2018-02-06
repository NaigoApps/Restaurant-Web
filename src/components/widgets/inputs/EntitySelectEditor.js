import React, {Component} from 'react';
import SelectWizardPage from "../wizard/SelectWizardPage";
import {findByUuid} from "../../../utils/Utils";
import GraphWizard from "../wizard/GraphWizard";

export default class EntitySelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData) {
        this.props.commitAction(wData["select_page"].get('uuid'));
    }

    render() {
        const renderer = this.props.renderer;
        const options = this.props.options;
        const label = this.props.label;
        const value = this.props.value;

        return (
            <GraphWizard
                isValid={wData => !!wData["select_page"]}
                hideReview={true}
                initialPage="select_page"
                label={label}
                renderer={wData => {
                    let option = findByUuid(options, wData["select_page"]);
                    if (option) {
                        return renderer(option);
                    }
                    return "?";
                }}
                commitAction={this.onWizardConfirm.bind(this)}>
                <SelectWizardPage
                    identifier="select_page"
                    initializer={value}
                    options={options}
                    optionRenderer={opt => opt ? renderer(opt) : ""}
                />
            </GraphWizard>
        );

    }

}
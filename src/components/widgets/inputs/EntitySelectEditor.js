import React, {Component} from 'react';
import Wizard from "../wizard/Wizard";
import SelectWizardPage from "../wizard/SelectWizardPage";
import {findByUuid} from "../../../utils/Utils";
import GraphWizard from "../wizard/GraphWizard";

export default class EntitySelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardConfirm(wData) {
        this.props.commitAction(wData["select_page"].uuid);
    }

    render() {
        const descriptor = this.props.descriptor;
        const value = this.props.value;

        return (
            <GraphWizard
                isValid={wData => !!wData["select_page"]}
                hideReview={true}
                initialPage="select_page"
                label={descriptor.label}
                renderer={wData => {
                    let option = findByUuid(descriptor.options, wData["select_page"]);
                    if (option) {
                        return descriptor.renderer(option);
                    }
                    return "?";
                }}
                commitAction={this.onWizardConfirm.bind(this)}>
                <SelectWizardPage
                    identifier="select_page"
                    initializer={value}
                    options={descriptor.options}
                    optionRenderer={opt => opt ? descriptor.renderer(opt) : ""}
                />
            </GraphWizard>
        );

    }

}
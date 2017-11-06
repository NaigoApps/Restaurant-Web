import React, {Component} from 'react';
import FormField from "./FormField";
import SelectInput from "./SelectInput";
import Wizard from "../wizard/Wizard";
import SelectWizardPage from "../wizard/SelectWizardPage";

export default class SelectEditor extends Component {
    constructor(props) {
        super(props);
    }

    onWizardClose(data){
        this.props.commitAction(data[0]);
    }

    render() {
        const descriptor = this.props.descriptor;

        return (
            <Wizard
                label={descriptor.label}
                renderer={(data) => this.props.value}
                commitAction={this.onWizardClose.bind(this)}>
                <SelectWizardPage
                    options={descriptor.optionsProvider()}
                    optionRenderer={opt => opt}
                />
            </Wizard>
        );

    }

}